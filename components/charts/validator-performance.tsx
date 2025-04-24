"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Dummy data - would be replaced with real RPC data
const data = [
  { name: "Epoch 365", produced: 4200, skipped: 120 },
  { name: "Epoch 366", produced: 4150, skipped: 140 },
  { name: "Epoch 367", produced: 4300, skipped: 90 },
  { name: "Epoch 368", produced: 4250, skipped: 110 },
  { name: "Epoch 369", produced: 4100, skipped: 180 },
  { name: "Epoch 370", produced: 4350, skipped: 70 },
  { name: "Epoch 371", produced: 4400, skipped: 60 },
  { name: "Epoch 372", produced: 4380, skipped: 80 },
]

export default function ValidatorPerformance() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
          <XAxis dataKey="name" stroke="#a0aec0" />
          <YAxis stroke="#a0aec0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#131a2c",
              borderColor: "#1e2a45",
              color: "#ffffff",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="produced" stroke="#4ade80" activeDot={{ r: 8 }} strokeWidth={2} />
          <Line type="monotone" dataKey="skipped" stroke="#f87171" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
