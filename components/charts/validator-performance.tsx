"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ValidatorPerformanceProps {
  data: {
    votePubkey: string,
    commission: number,
    produced: number,
    skipped: number,
  }[]
}

export default function ValidatorPerformance({ data }: ValidatorPerformanceProps) {
  // Add a shortKey property to each data item
  const chartData = data.map(item => ({
    ...item,
    shortKey: item.votePubkey.slice(0, 3) + "…" + item.votePubkey.slice(-1)
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
          <XAxis
            dataKey="shortKey"
            stroke="#a0aec0"
            tick={false}
          />
          <YAxis
            stroke="#a0aec0"
            label={{
              value: "Produced / Skipped",
              angle: -90,
              position: "insideLeft",
              fill: "#a0aec0",
              style: {
                textAnchor: "middle"
              }
            }}
            tick={{ fill: "#a0aec0" }}
            tickMargin={0}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#131a2c",
              borderColor: "#1e2a45",
              color: "#ffffff",
            }}
            formatter={(value, name, props) => {
              if (name === 'produced') {
                return [`${value} blocks produced`, `Validator: ${props.payload.votePubkey}`];
              } else if (name === 'skipped') {
                return [`${value} blocks skipped`, `Validator: ${props.payload.votePubkey}`];
              }
              return [value, name];
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
