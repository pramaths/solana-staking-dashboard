"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

interface ValidatorData {
  votePubkey: string;
  commission: number;
  activatedStake: number;
  creditsEarned: number;
  uptime: number; // 0.98 for 98%
}

interface ValidatorsUptimeChartProps {
  data: ValidatorData[];
}

export default function ValidatorsUptimeChart({ data }: ValidatorsUptimeChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3a5a" />
          <XAxis
            dataKey="name"
            stroke="#a0aec0"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
            tickFormatter={(value) =>
              value.length > 10
                ? `${value.slice(0, 4)}...${value.slice(-4)}`
                : value
            }
          >
            <Label
              value="Validator Vote Pubkey"
              offset={30}
              position="insideBottom"
              style={{ fill: "#a0aec0", fontSize: 12 }}
            />
          </XAxis>
          <YAxis
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            stroke="#4ade80"
          >
            <Label
              value="Uptime (%)"
              angle={-90}
              position="insideLeft"
              style={{ fill: "#4ade80", fontSize: 12 }}
            />
          </YAxis>
          <Tooltip
            formatter={(value: number, name: string) =>
              name === "uptime" ? `${(value * 100).toFixed(2)}%` : value
            }
            labelFormatter={(label) => `Validator: ${label}`}
            contentStyle={{
              backgroundColor: "#131a2c",
              borderColor: "#1e2a45",
              color: "#ffffff",
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ color: "#a0aec0", fontSize: 13 }}
          />
          <Line
            type="monotone"
            dataKey="uptime"
            name="Uptime"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
