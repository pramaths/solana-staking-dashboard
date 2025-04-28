import { NextResponse } from "next/server";
import { Helius } from "helius-sdk";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET() {
  try {
    const samples = await helius.connection.getRecentPerformanceSamples(60); // last 60 minutes

    const data = samples.map((s) => ({
      timestamp: new Date(s.samplePeriodSecs * 1000).toLocaleTimeString(),
      tps: s.numTransactions / s.samplePeriodSecs,
      slotTime: s.samplePeriodSecs,
    })).reverse();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to fetch TPS/Slot time samples", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
