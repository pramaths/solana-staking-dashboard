"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"

interface CommissionYieldProps {
  data: {
    votePubkey: string,
    commission: number,
    inflationReward: number,
    stake: number,
    grossYield: number,
    netYield: number
  }[]
}

export default function CommissionYield({ data }: CommissionYieldProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
          <XAxis
            type="number"
            dataKey="commission"
            name="Commission"
            unit="%"
            domain={[0, 100]}
            stroke="#a0aec0"
            label={{ value: "Commission (%)", position: "insideBottomRight", offset: -10, fill: "#a0aec0" }}
          />
          <YAxis
            type="number"
            dataKey="netYield"
            name="Net Yield"
            unit="%"
            domain={['auto', 'auto']}
            stroke="#a0aec0"
            label={{ value: "Net APY (%)", angle: -90, position: "insideLeft", fill: "#a0aec0" }}
          />
          <ZAxis type="number" dataKey="stake" range={[40, 160]} name="Stake (SOL)" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#131a2c",
              borderColor: "#1e2a45",
              color: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              padding: 12,
              fontSize: 14,
            }}
            itemStyle={{
              color: "#fff",
              fontWeight: 500,
              marginBottom: 4,
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: 700,
              marginBottom: 8,
            }}
            formatter={(value: number, name: string) => {
              if (name === "Commission") return [value, name]
              if (name === "Net Yield") return [value, name]
              if (name === "Stake (SOL)") return [value, name]
              if (name === "grossYield") return [`${value}%`, "Gross Yield"]
              if (name === "inflationReward") return [value, "Inflation Reward (lamports)"]
              return [value, name]
            }}
            labelFormatter={(_, payload) => {
              if (!payload || !payload.length) return ""
              const d = payload[0].payload
              return `Validator: ${d.votePubkey}`
            }}
          />
          <Scatter name="Validators" data={data} fill="#8884d8" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
