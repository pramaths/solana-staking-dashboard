import { Helius } from "helius-sdk";
import { NextResponse } from "next/server";
const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET(request: Request) {
    const response = await helius.connection.getSupply();
    return NextResponse.json(response);
}
