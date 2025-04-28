"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"


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

interface StakeDistributionProps {
  data?: {pubkey: string, stake: number}[] | []
}

export default function StakeDistribution({ data = [] }: StakeDistributionProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-gray-400">No stake distribution data available</p>
      </div>
    )
  }

  // Process data to include shortened pubkeys for display
  const processedData = data.map(item => ({
    ...item,
    shortPubkey: `${item.pubkey.slice(0, 4)}...${item.pubkey.slice(-4)}`,
    fullPubkey: item.pubkey,
    stake: item.stake
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="stake"
            nameKey="shortPubkey"
            label={({ shortPubkey, percent }) => {
              return `${shortPubkey}: ${(percent * 100).toFixed(0)}%`;
            }}
          >
            {processedData.map((entry, index) => (
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
                        <span className="text-sm font-bold text-white">{data.shortPubkey}</span>
                        <span className="text-xs text-gray-300">{(data.stake / 1000000).toFixed(2)}M SOL</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            formatter={(value, entry, index) => {
              // Ensure legend items also use shortened pubkeys
              return <span className="text-sm">{value}</span>;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
