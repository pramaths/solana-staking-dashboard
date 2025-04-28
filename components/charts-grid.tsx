"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StakeDistribution from "@/components/charts/stake-distribution"
import ValidatorPerformance from "@/components/charts/validator-performance"
import CommissionYield from "@/components/charts/commission-yield"
import ValidatorsUptimeChart from "@/components/charts/validators-uptime"
import { useIsMobile } from "@/hooks/use-mobile"

interface Metrics {
  stakeDistribution: {
    totalStaked: number,
    circulatingSupply: number,
    nonCirculatingSupply: number,
    topValidators: {pubkey: string, stake: number}[]
  }
  validatorPerformance:  {
    votePubkey: string,
    commission: number,
    produced: number,
    skipped: number,
    expected: number,
    uptime: number
  }[]
  commissionYield: {
    votePubkey: string,
    commission: number,
    inflationReward: number,
    stake: number,
    grossYield: number,
    netYield: number
  }[]
  inflationRewardTrend: {
    epoch: number,
    totalReward: number
  }[]
  epochStatus: {
    progress: number
  }
  tpsSlotTime: any[],
  validatorsUptime: {
    votePubkey: string,
    commission: number,
    activatedStake: number,
    creditsEarned: number,
    uptime: number
  }[]
}

export default function ChartsGrid() {
  const isMobile = useIsMobile()

  const [metrics, setMetrics] = useState<Metrics>({} as Metrics);
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchAll() {
      try {
        const response = await fetch('/api/chart');
        const [epochRes, perfRes] = await Promise.all([
          fetch('/api/epoch-status'),
          fetch('/api/tps-slot-time')
        ])
        const epochData = await epochRes.json();
        const perfData = await perfRes.json();
        const metrics = await response.json();
        setMetrics({
          ...metrics,
          epochStatus: epochData,
          tpsSlotTime: perfData.data
        });
      } catch {
        setError(true);
      }
    }
    fetchAll()
  }, [])

  if (isMobile) {
    return (
      <div className="mb-8">
        <Tabs defaultValue="stake-distribution">
          <TabsList className="grid grid-cols-2 mb-4 bg-[#1e2a45]">
            <TabsTrigger value="stake-distribution" className="data-[state=active]:bg-[#2a3a5a] text-white">
              Stake Distribution
            </TabsTrigger>
            <TabsTrigger value="validator-performance" className="data-[state=active]:bg-[#2a3a5a] text-white">
              Validator Performance
            </TabsTrigger>
            <TabsTrigger value="participation-trend" className="data-[state=active]:bg-[#2a3a5a] text-white">
              Participation Trend
            </TabsTrigger>
            <TabsTrigger value="commission-yield" className="data-[state=active]:bg-[#2a3a5a] text-white">
              Commission vs Yield
            </TabsTrigger>
            <TabsTrigger value="epoch-status" className="data-[state=active]:bg-[#2a3a5a] text-white">
              Epoch Status
            </TabsTrigger>
            <TabsTrigger value="tps-slot-time" className="data-[state=active]:bg-[#2a3a5a] text-white">
              TPS / Slot Time
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stake-distribution">
            <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Stake Distribution</CardTitle>
                <CardDescription className="text-gray-300">Top 10 validators by stake</CardDescription>
              </CardHeader>
              <CardContent>
                <StakeDistribution 
                  data={metrics?.stakeDistribution?.topValidators || []} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="validator-performance">
            <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Validator Performance</CardTitle>
                <CardDescription className="text-gray-300">Blocks produced vs skipped</CardDescription>
              </CardHeader>
              <CardContent>
                <ValidatorPerformance data={metrics?.validatorPerformance || []} />
              </CardContent>
            </Card>
          </TabsContent>
         
          <TabsContent value="commission-yield">
            <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Commission vs Yield</CardTitle>
                <CardDescription className="text-gray-300">Validator commission rates and yields</CardDescription>
              </CardHeader>
              <CardContent>
                <CommissionYield data={metrics?.commissionYield || []} />
              </CardContent>
            </Card>
          </TabsContent>
         
          <TabsContent value="tps-slot-time">
            <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">TPS / Slot Time</CardTitle>
                <CardDescription className="text-gray-300">Performance over last hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ValidatorsUptimeChart data={metrics?.validatorsUptime || []} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Stake Distribution</CardTitle>
          <CardDescription className="text-gray-300">Top 10 validators by stake</CardDescription>
        </CardHeader>
        <CardContent>
          <StakeDistribution 
            data={metrics?.stakeDistribution?.topValidators || []} 
          />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Validator Performance</CardTitle>
          <CardDescription className="text-gray-300">Blocks produced vs skipped</CardDescription>
        </CardHeader>
        <CardContent>
          <ValidatorPerformance data={metrics?.validatorPerformance || []} />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Commission vs Yield</CardTitle>
          <CardDescription className="text-gray-300">Validator commission rates and yields</CardDescription>
        </CardHeader>
        <CardContent>
          <CommissionYield data={metrics?.commissionYield || []} />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">TPS / Slot Time</CardTitle>
          <CardDescription className="text-gray-300">Performance over last hour</CardDescription>
        </CardHeader>
        <CardContent>
          <ValidatorsUptimeChart data={metrics?.validatorsUptime || []} />
        </CardContent>
      </Card>
    </div>
  )
}
