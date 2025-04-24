'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, Coins } from "lucide-react"
import { useState, useEffect } from "react"

interface StakeAccount {
  totalActiveStake: number
  totalDelinquentStake: number
  totalCurrentAccounts: number
  totalDelinquentAccounts: number
  pctDelinquent: number
  supply: {
    circulating: number
    nonCirculating: number
    total: number
  }
}

interface ActiveValidators {
  value: number
  change: number
  timeRemaining: string
  epoch: number
}


export default function KpiCards() {
  const [stakeAccounts, setStakeAccounts] = useState<StakeAccount | null>(null)
  const [activeValidators, setActiveValidators] = useState<ActiveValidators | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const [stakeRes, activeRes] = await Promise.all([
          fetch("/api/stake-distribution"),
          fetch("/api/active-validators"),
        ])
        if (!stakeRes.ok || !activeRes.ok) throw new Error()

        const stakeData = await stakeRes.json()
        const activeData = await activeRes.json()

        setStakeAccounts(stakeData)
        setActiveValidators(activeData)
      } catch (e) {
        console.error(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const display = (value: any) => {
    if (loading) return '—'
    if (error || value == null) return 'N/A'
    return value
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Coins className="h-5 w-5 text-purple-400" /> Total SOL Staked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-white">
            {display(
              stakeAccounts
                ? ((stakeAccounts.totalActiveStake + stakeAccounts.totalDelinquentStake) / 1000000).toFixed(2) + 'M'
                : null
            )} SOL
          </div>
          <div className="flex items-center justify-between mb-1 text-sm text-gray-300">
            <span>
              {display(
                stakeAccounts
                  ? (((stakeAccounts.totalActiveStake + stakeAccounts.totalDelinquentStake) / stakeAccounts.supply.total) * 100).toFixed(2)
                  : null
              )}% of supply
            </span>
            <span>
              {display(
                stakeAccounts
                  ? ((stakeAccounts.totalActiveStake + stakeAccounts.totalDelinquentStake) / 1000000).toFixed(2) + 'M'
                  : null
              )}{' '}/{' '}
              {display(
                stakeAccounts ? (stakeAccounts.supply.total / 1000000).toFixed(0) + 'M' : null
              )}
            </span>
          </div>
          <Progress
            value={stakeAccounts ? (((stakeAccounts.totalActiveStake + stakeAccounts.totalDelinquentStake) / stakeAccounts.supply.total) * 100) : 0}
            className="h-2 bg-[#1e2a45]"
            indicatorColor="hsl(265, 89%, 78%)"
          />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <CheckCircle className="h-5 w-5 text-green-400" /> Active Validators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-white">
            {display(activeValidators?.value.toLocaleString())}
          </div>
          <div className="flex items-center text-sm">
            <span
              className={`${
                activeValidators && activeValidators.change > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              } font-medium`}
            >
              {display(
                activeValidators &&
                  (activeValidators.change > 0 ? '+' : '') + activeValidators.change
              )}
            </span>
            <span className="text-gray-300 ml-1">since last epoch</span>
          </div>
        </CardContent>
      </Card>

      {/* Delinquent Stake % */}
      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <AlertTriangle className={`h-5 w-5 text-blue-400`} /> Delinquent Stake %
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-white">
            {display(stakeAccounts?.pctDelinquent.toFixed(2))}%
          </div>
          <div className="w-full bg-[#1e2a45] rounded-full h-4 relative overflow-hidden">
            <div
              className={`h-full rounded-full $
                stakeAccounts && stakeAccounts.pctDelinquent > 5
                  ? 'bg-amber-500'
                  : 'bg-blue-500'
              }`}
              style={{
                width: `${
                  stakeAccounts
                    ? Math.min(stakeAccounts.pctDelinquent, 100)
                    : 0
                }%`
              }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-medium text-white">
              {stakeAccounts && stakeAccounts.pctDelinquent > 5
                ? 'Warning'
                : 'Healthy'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Epoch */}
      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-cyan-400" /> Current Epoch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-white">
            {display(activeValidators?.epoch)}
          </div>
          {/* Time remaining can be calculated server-side and added to this card */}
          <div className="flex items-center text-sm text-gray-300">
            <span>Time remaining: {activeValidators?.timeRemaining}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
