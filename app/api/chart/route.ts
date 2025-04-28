import { NextResponse } from "next/server";
import { Helius } from "helius-sdk";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET() {
  const [voteAccounts, supply] = await Promise.all([
    helius.connection.getVoteAccounts(),
    helius.connection.getSupply(),
  ]);
  const epochInfo = await helius.connection.getEpochInfo();

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

  const blockProd = await helius.connection.getBlockProduction();
const byIdentity = blockProd.value.byIdentity;

const validatorPerformance = voteAccounts.current.map((v) => {
  const [leaderSlots = 0, producedBlocks = 0] = byIdentity[v.nodePubkey] ?? [];

  const expected = leaderSlots;                 // slots assigned
  const skipped  = expected - producedBlocks;   // slots missed
  const uptime   = expected ? (producedBlocks / expected) * 100 : 0;

  return {
    votePubkey : v.votePubkey,
    commission : v.commission,
    produced   : producedBlocks,
    skipped,
    expected,
    uptime     : +uptime.toFixed(2),
  };
});


  const keys = voteAccounts.current.map((v) => new PublicKey(v.votePubkey));

  let rewards = [];
  try {
    rewards = await helius.connection.getInflationReward(
      keys,
      epochInfo.epoch
    );
  } catch (error) {
    console.warn(
      `Inflation rewards not available for epoch ${epochInfo.epoch - 1}`,
      error
    );
    try {
      rewards = await helius.connection.getInflationReward(
        keys,
        epochInfo.epoch - 1
      );
    } catch (innerError) {
      console.error(
        `Failed to get inflation rewards for epoch ${
          epochInfo.epoch - 2
        } as well`,
        innerError
      );
      rewards = Array(keys.length).fill(null);
    }
  }

  const commissionYield = voteAccounts.current.map((v, idx) => {
    const reward = rewards[idx]?.amount ?? 0;
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

  const currentEpoch = epochInfo.epoch;

  const epochsAgo = 10;
  const inflationRewardTrend: { epoch: number; totalReward: number }[] = [];

  for (let e = currentEpoch - epochsAgo; e < currentEpoch - 1; e++) {
    try {
      const rewardsForEpoch = await helius.connection.getInflationReward(
        keys,
        e
      );
      const totalReward = rewardsForEpoch.reduce(
        (sum, r) => sum + (r?.amount ?? 0),
        0
      );
      inflationRewardTrend.push({ epoch: e, totalReward });
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (err) {
      console.warn(`inflationReward for epoch ${e} not available, skipping`);
      inflationRewardTrend.push({ epoch: e, totalReward: 0 });
    }
  }

  const slotsInEpoch = epochInfo.slotsInEpoch;

  const allValidators = [...voteAccounts.current, ...voteAccounts.delinquent];

  const validators = allValidators.map(v => {
    const credits = v.epochCredits;

    if (!credits || credits.length === 0) return null;

    const [latestEpoch, currentCredits, previousCredits] = credits[credits.length - 1];
    const creditsEarned = currentCredits - previousCredits;

    const uptimeRaw = (creditsEarned / slotsInEpoch) * 100;
    const uptime = Math.min(uptimeRaw, 100).toFixed(2); // Cap at 100%

    return {
      votePubkey: v.votePubkey,
      commission: v.commission,
      activatedStake: v.activatedStake,
      creditsEarned,
      uptime: parseFloat(uptime),
    };
  }).filter(Boolean);

  return NextResponse.json({
    stakeDistribution: stakeDist,
    validatorPerformance,
    commissionYield,
    inflationRewardTrend,
    validatorsUptime: validators,
  });
}
