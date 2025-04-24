"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"

// Dummy data - would be replaced with real RPC data
const data = [
  { name: "Validator A", commission: 1, yield: 7.2, size: 120 },
  { name: "Validator B", commission: 2, yield: 7.1, size: 100 },
  { name: "Validator C", commission: 3, yield: 6.9, size: 90 },
  { name: "Validator D", commission: 5, yield: 6.7, size: 110 },
  { name: "Validator E", commission: 7, yield: 6.5, size: 80 },
  { name: "Validator F", commission: 8, yield: 6.3, size: 70 },
  { name: "Validator G", commission: 10, yield: 6.0, size: 85 },
  { name: "Validator H", commission: 0, yield: 7.3, size: 60 },
  { name: "Validator I", commission: 4, yield: 6.8, size: 95 },
  { name: "Validator J", commission: 6, yield: 6.6, size: 75 },
  { name: "Validator K", commission: 2.5, yield: 7.0, size: 105 },
  { name: "Validator L", commission: 9, yield: 6.1, size: 65 },
  { name: "Validator M", commission: 1.5, yield: 7.15, size: 115 },
  { name: "Validator N", commission: 3.5, yield: 6.85, size: 85 },
  { name: "Validator O", commission: 5.5, yield: 6.65, size: 95 },
]

export default function CommissionYield() {
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
            domain={[0, 10]}
            stroke="#a0aec0"
            label={{ value: "Commission (%)", position: "insideBottomRight", offset: -10, fill: "#a0aec0" }}
          />
          <YAxis
            type="number"
            dataKey="yield"
            name="Yield"
            unit="%"
            domain={[5.5, 7.5]}
            stroke="#a0aec0"
            label={{ value: "APY (%)", angle: -90, position: "insideLeft", fill: "#a0aec0" }}
          />
          <ZAxis type="number" dataKey="size" range={[40, 160]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#131a2c",
              borderColor: "#1e2a45",
              color: "#ffffff",
            }}
            formatter={(value: number, name: string) => {
              if (name === "Commission") return [`${value}%`, name]
              if (name === "Yield") return [`${value}%`, "APY"]
              return [value, name]
            }}
          />
          <Scatter name="Validators" data={data} fill="#8884d8" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
