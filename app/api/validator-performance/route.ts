import { Helius } from "helius-sdk";
import { NextResponse } from "next/server";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET(request: Request) {
   const voteAccounts = await helius.connection.getVoteAccounts();
   const blockProd = await helius.connection.getBlockProduction();
   const perfSamples = await helius.connection.getRecentPerformanceSamples(20);

   const performance = voteAccounts.current.map((v) => {
    const stats = blockProd.schedulers.find(
      (s) => s.identity === v.nodePubkey
    ) || { numProduced: 0, numExpected: 0 };
    return {
      validator: v.nodePubkey,
      commission: v.commission,
      produced: stats.numProduced,
      expected: stats.numExpected,
      uptime: stats.numExpected
        ? ((stats.numProduced / stats.numExpected) * 100).toFixed(2)
        : '0.00',
    };
  });

  return NextResponse.json({ performance, perfSamples });

}
