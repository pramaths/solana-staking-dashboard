"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Dummy data - would be replaced with real RPC data
const data = [
  { epoch: 365, stakers: 45000 },
  { epoch: 366, stakers: 47500 },
  { epoch: 367, stakers: 51000 },
  { epoch: 368, stakers: 54500 },
  { epoch: 369, stakers: 58000 },
  { epoch: 370, stakers: 62500 },
  { epoch: 371, stakers: 67000 },
  { epoch: 372, stakers: 72500 },
]

export default function ParticipationTrend() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
          <XAxis
            dataKey="epoch"
            stroke="#a0aec0"
            label={{ value: "Epoch", position: "insideBottomRight", offset: -10, fill: "#a0aec0" }}
          />
          <YAxis stroke="#a0aec0" label={{ value: "Stakers", angle: -90, position: "insideLeft", fill: "#a0aec0" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#131a2c",
              borderColor: "#1e2a45",
              color: "#ffffff",
            }}
            formatter={(value: number) => [`${value.toLocaleString()} stakers`, "Participants"]}
            labelFormatter={(value) => `Epoch ${value}`}
          />
          <Area type="monotone" dataKey="stakers" stroke="#8884d8" fill="url(#colorStakers)" strokeWidth={2} />
          <defs>
            <linearGradient id="colorStakers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
