"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Dummy data - would be replaced with real RPC data
const data = [
  { name: "Validator A", value: 12500000 },
  { name: "Validator B", value: 8750000 },
  { name: "Validator C", value: 7250000 },
  { name: "Validator D", value: 6500000 },
  { name: "Validator E", value: 5750000 },
  { name: "Validator F", value: 4250000 },
  { name: "Validator G", value: 3750000 },
  { name: "Validator H", value: 3250000 },
  { name: "Validator I", value: 2750000 },
  { name: "Validator J", value: 2250000 },
]

const COLORS = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff8042",
  "#ff6361",
  "#bc5090",
]

export default function StakeDistribution() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border border-[#1e2a45] bg-[#131a2c] p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{data.name}</span>
                        <span className="text-xs text-gray-300">{(data.value / 1000000).toFixed(2)}M SOL</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
