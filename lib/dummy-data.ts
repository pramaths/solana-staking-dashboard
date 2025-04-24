// This file contains dummy data that would be replaced with real RPC calls
// in a production environment

// KPI Data
export const kpiData = {
  totalStaked: {
    value: 154328921,
    total: 500000000,
    percentageStaked: 30.87,
  },
  activeValidators: {
    value: 1872,
    change: 12,
  },
  delinquentStake: {
    value: 3.2,
    isWarning: false,
  },
  currentEpoch: {
    value: 372,
    timeRemaining: "2d 14h",
  },
}

// Stake Distribution Data
export const stakeDistributionData = [
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

// Validator Performance Data
export const validatorPerformanceData = [
  { name: "Epoch 365", produced: 4200, skipped: 120 },
  { name: "Epoch 366", produced: 4150, skipped: 140 },
  { name: "Epoch 367", produced: 4300, skipped: 90 },
  { name: "Epoch 368", produced: 4250, skipped: 110 },
  { name: "Epoch 369", produced: 4100, skipped: 180 },
  { name: "Epoch 370", produced: 4350, skipped: 70 },
  { name: "Epoch 371", produced: 4400, skipped: 60 },
  { name: "Epoch 372", produced: 4380, skipped: 80 },
]

// Participation Trend Data
export const participationTrendData = [
  { epoch: 365, stakers: 45000 },
  { epoch: 366, stakers: 47500 },
  { epoch: 367, stakers: 51000 },
  { epoch: 368, stakers: 54500 },
  { epoch: 369, stakers: 58000 },
  { epoch: 370, stakers: 62500 },
  { epoch: 371, stakers: 67000 },
  { epoch: 372, stakers: 72500 },
]

// Commission vs Yield Data
export const commissionYieldData = [
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

// Alerts Data
export const alertsData = [
  {
    id: 1,
    type: "Delinquent Stake",
    validator: "Validator E",
    value: "5.8%",
    severity: "warning",
    timestamp: "2023-06-15 14:32:45",
  },
  {
    id: 2,
    type: "Low Performance",
    validator: "Validator I",
    value: "78.5%",
    severity: "warning",
    timestamp: "2023-06-15 12:18:22",
  },
  {
    id: 3,
    type: "Commission Change",
    validator: "Validator C",
    value: "3% → 5%",
    severity: "info",
    timestamp: "2023-06-15 09:45:11",
  },
]
