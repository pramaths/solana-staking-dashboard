import { NextResponse } from "next/server";
import { Helius } from "helius-sdk";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET() {
  try {
    const epochInfo = await helius.connection.getEpochInfo();
    const progressPct =
      epochInfo.slotsInEpoch > 0
        ? (epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100
        : 0;

    const remainingSlots = epochInfo.slotsInEpoch - epochInfo.slotIndex;
    const remainingSeconds = remainingSlots * 0.4; // ~400ms per slot on Solana

    return NextResponse.json({
      epoch: epochInfo.epoch,
      slotIndex: epochInfo.slotIndex,
      slotsInEpoch: epochInfo.slotsInEpoch,
      progress: parseFloat(progressPct.toFixed(2)),
      timeRemainingSec: Math.max(0, Math.floor(remainingSeconds)),
    });
  } catch (error) {
    console.error("Failed to fetch epoch status", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
