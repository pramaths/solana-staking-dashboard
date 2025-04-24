import { Helius } from "helius-sdk";
import { NextResponse } from "next/server";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET(request: Request) {
  const epochInfo = await helius.connection.getEpochInfo();

  const currSchedule = await helius.connection.getLeaderSchedule();
  const prevSchedule = await fetch(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "1",
        method: "getLeaderSchedule",
        params: [epochInfo.epoch - 1],
      }),
    }
  );
  const currentSlotTime = await helius.connection.getBlockTime(
    epochInfo.absoluteSlot
  );
  const remainingSlots = Math.max(
    0,
    epochInfo.slotsInEpoch - epochInfo.slotIndex
  );
  const estimatedEndTime = currentSlotTime
    ? currentSlotTime + remainingSlots * 0.4
    : 0; 
  const nowSec = Math.floor(Date.now() / 1000);
  const secsRemaining = Math.max(0, Math.floor(estimatedEndTime - nowSec));
  const hours = Math.floor(secsRemaining / 3600);
  const minutes = Math.floor((secsRemaining % 3600) / 60);
  const timeRemaining = `${hours}h ${minutes}m`;

  const data = await prevSchedule.json();

  const activeValidators = Object.keys(currSchedule || {});
  const prevActiveValidators = Object.keys(data.result || {});

  return NextResponse.json({
    value: activeValidators.length,
    change: Math.abs(activeValidators.length - prevActiveValidators.length),
    timeRemaining,
    epoch: epochInfo.epoch,
  });
}
