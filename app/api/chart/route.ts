import { NextResponse } from "next/server";
import { Helius } from "helius-sdk";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET() {
  // Parallelize all initial RPC calls
  const [voteAccounts, supply, epochInfo, blockProd] = await Promise.all([
    helius.connection.getVoteAccounts(),
    helius.connection.getSupply(),
    helius.connection.getEpochInfo(),
    helius.connection.getBlockProduction(),
  ]);

  const totalStakedActive = voteAccounts.current.reduce(
    (sum, v) => sum + v.activatedStake,
    0
  );
  const totalStakedDilquent = voteAccounts.delinquent.reduce(
    (sum, v) => sum + v.activatedStake,
    0
  );
  const totalStaked = totalStakedActive + totalStakedDilquent;
  const stakeDist = {
    totalStaked: totalStaked / 1e9,
    circulatingSupply: supply.value.circulating / 1e9,
    nonCirculatingSupply: supply.value.nonCirculating / 1e9,
    topValidators: voteAccounts.current
      .map((v) => ({ pubkey: v.votePubkey, stake: v.activatedStake / 1e9 }))
      .sort((a, b) => b.stake - a.stake)
      .slice(0, 10),
  };

  const byIdentity = blockProd.value.byIdentity;
  const validatorPerformance = voteAccounts.current.map((v) => {
    const [leaderSlots = 0, producedBlocks = 0] = byIdentity[v.nodePubkey] ?? [];
    const expected = leaderSlots;
    const skipped = expected - producedBlocks;
    const uptime = expected ? (producedBlocks / expected) * 100 : 0;
    return {
      votePubkey: v.votePubkey,
      commission: v.commission,
      produced: producedBlocks,
      skipped,
      expected,
      uptime: +uptime.toFixed(2),
    };
  });

  const keys = voteAccounts.current.map((v) => new PublicKey(v.votePubkey));

  const currentEpochRewards = await helius.connection.getInflationReward(
    keys,
    epochInfo.epoch - 1
  ).catch(() => Array(keys.length).fill(null));

  const epochsAgo = 5;
  const historicalRewardsPromises = [];
  
  for (let e = epochInfo.epoch - epochsAgo; e < epochInfo.epoch - 1; e++) {
    historicalRewardsPromises.push(
      helius.connection.getInflationReward(keys, e)
        .catch(() => Array(keys.length).fill(null))
    );
  }

  const historicalRewards = await Promise.all(historicalRewardsPromises);

  const commissionYield = voteAccounts.current.map((v, idx) => {
    const reward = currentEpochRewards[idx]?.amount ?? 0;
    const stake = v.activatedStake / 1e9;
    const commission = v.commission;
    const grossYield = stake > 0 ? ((reward / 1e9) / stake) * 100 : 0;
    const netYield = grossYield * (1 - commission / 100);

    return {
      votePubkey: v.votePubkey,
      commission,
      inflationReward: reward,
      stake,
      grossYield: parseFloat(grossYield.toFixed(2)),
      netYield: parseFloat(netYield.toFixed(2)),
    };
  });

  const inflationRewardTrend = historicalRewards.map((rewardsForEpoch, index) => {
    const epoch = epochInfo.epoch - epochsAgo + index;
    const totalReward = rewardsForEpoch.reduce(
      (sum, r) => sum + (r?.amount ?? 0),
      0
    );
    return { epoch, totalReward };
  });

  const slotsInEpoch = epochInfo.slotsInEpoch;
  const allValidators = [...voteAccounts.current, ...voteAccounts.delinquent];
  const validators = allValidators
    .map(v => {
      const credits = v.epochCredits;
      if (!credits || credits.length === 0) return null;
      const [latestEpoch, currentCredits, previousCredits] = credits[credits.length - 1];
      const creditsEarned = currentCredits - previousCredits;
      const uptimeRaw = (creditsEarned / slotsInEpoch) * 100;
      const uptime = Math.min(uptimeRaw, 100).toFixed(2);
      return {
        votePubkey: v.votePubkey,
        commission: v.commission,
        activatedStake: v.activatedStake,
        creditsEarned,
        uptime: parseFloat(uptime),
      };
    })
    .filter(Boolean);

  return NextResponse.json({
    stakeDistribution: stakeDist,
    validatorPerformance,
    commissionYield,
    inflationRewardTrend,
    validatorsUptime: validators,
  });
}