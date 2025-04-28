import { NextResponse } from "next/server";
import { Connection } from "@solana/web3.js";

const connection = new Connection('https://api.mainnet-beta.solana.com');

export async function GET() {
  try {
    const voteAccounts = await connection.getVoteAccounts();
    const epochInfo = await connection.getEpochInfo();
    const slotsInEpoch = epochInfo.slotsInEpoch;

    const alerts = [];
    let idCounter = 1;
    const now = new Date().toISOString(); // Current timestamp

    // Delinquent Stake Alerts
    for (const v of voteAccounts.delinquent) {
      alerts.push({
        id: idCounter++,
        type: "Delinquent Stake",
        validator: v.votePubkey.slice(0, 8) + "..." + v.votePubkey.slice(-8),
        value: `${(v.activatedStake / 1e9).toFixed(2)} SOL`,
        severity: "warning",
        timestamp: now
      });
    }

    // Low Performance Alerts
    for (const v of voteAccounts.current) {
      const credits = v.epochCredits;
      if (!credits || credits.length < 1) continue;

      const [epoch, current, previous] = credits[credits.length - 1];
      const creditsEarned = current - previous;
      const uptimeRaw = (creditsEarned / slotsInEpoch) * 100;
      const uptime = Math.min(uptimeRaw, 100);

      if (uptime < 80) { // Threshold
        alerts.push({
          id: idCounter++,
          type: "Low Performance",
          validator: v.votePubkey.slice(0, 8) + "..." + v.votePubkey.slice(-8),
          value: `${uptime.toFixed(2)}%`,
          severity: "warning",
          timestamp: now
        });
      }
    }

    return NextResponse.json({ success: true, alerts });

  } catch (error) {
    console.error("Error generating alerts:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
