import { Helius } from "helius-sdk";
import { NextResponse } from "next/server";
const helius = new Helius(process.env.HELIUS_API_KEY as string);

export async function GET(request: Request) {
    const response = await helius.connection.getVoteAccounts();
    const supply = await helius.connection.getSupply();
    const { circulating, nonCirculating, total } = supply.value;
    const { current, delinquent } = response;
    let totalActiveStake = 0;
    let totalDelinquentStake = 0;
    let totalCurrentAccounts = 0;
    let totalDelinquentAccounts = 0;
    let pctDelinquent = 0;
    for (const account of current) {
        totalActiveStake += account.activatedStake;
        totalCurrentAccounts++;
    }
    for (const account of delinquent) {
        totalDelinquentStake += account.activatedStake;
        totalDelinquentAccounts++;
    }
    pctDelinquent = totalActiveStake > 0 ? (totalDelinquentStake / totalActiveStake) * 100 : 0;
    const stakeAccounts = {
        totalActiveStake: totalActiveStake / 1000000000,
        totalDelinquentStake: totalDelinquentStake / 1000000000,
        totalCurrentAccounts,
        totalDelinquentAccounts,
        response,
        supply: {
            circulating: circulating / 1000000000,
            nonCirculating: nonCirculating / 1000000000,
            total: total / 1000000000
        },
        pctDelinquent
    }
    return NextResponse.json(stakeAccounts);
}
