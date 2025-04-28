import { Helius } from "helius-sdk";
import { NextResponse } from "next/server";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET(request: Request) {
  const voteAccounts = await helius.connection.getVoteAccounts();
  const blockProd = await helius.connection.getBlockProduction();
  const perfSamples = await helius.connection.getRecentPerformanceSamples(20);
  const byIdentity = blockProd.value.byIdentity;

  // Merge block production stats with vote accounts
  const performance = voteAccounts.current.map((v) => {
    const identity = v.nodePubkey;
    const stats = byIdentity[identity] || [0, 0];
    const produced = stats[0];
    const skipped = stats[1];
    const expected = produced + skipped;
    const uptime = expected ? (produced / expected) * 100 : 0;
    return {
      votePubkey: v.votePubkey,
      nodePubkey: identity,
      commission: v.commission,
      produced,
      skipped,
      expected,
      uptime: parseFloat(uptime.toFixed(2)),
    };
  });

  return NextResponse.json({
    performance,
    perfSamples,
    context: blockProd.context,
    byIdentity,
    range: blockProd.value.range,
  });
}
