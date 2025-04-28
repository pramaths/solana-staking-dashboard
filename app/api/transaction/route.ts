import { NextResponse } from "next/server";
import { Helius } from "helius-sdk";


const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET() {
  try {
    const transactions = await helius.connection.getParsedTransactions
    return NextResponse.json({ data: transactions });
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
