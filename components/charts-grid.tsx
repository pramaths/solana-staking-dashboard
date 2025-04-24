"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StakeDistribution from "@/components/charts/stake-distribution"
import ValidatorPerformance from "@/components/charts/validator-performance"
import ParticipationTrend from "@/components/charts/participation-trend"
import CommissionYield from "@/components/charts/commission-yield"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ChartsGrid() {
  const isMobile = useIsMobile()

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
          </TabsList>
          <TabsContent value="stake-distribution">
            <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Stake Distribution</CardTitle>
                <CardDescription className="text-gray-300">Top 10 validators by stake</CardDescription>
              </CardHeader>
              <CardContent>
                <StakeDistribution />
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
                <ValidatorPerformance />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="participation-trend">
            <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Participation Trend</CardTitle>
                <CardDescription className="text-gray-300">Staker count by epoch</CardDescription>
              </CardHeader>
              <CardContent>
                <ParticipationTrend />
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
                <CommissionYield />
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
          <StakeDistribution />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Validator Performance</CardTitle>
          <CardDescription className="text-gray-300">Blocks produced vs skipped</CardDescription>
        </CardHeader>
        <CardContent>
          <ValidatorPerformance />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Participation Trend</CardTitle>
          <CardDescription className="text-gray-300">Staker count by epoch</CardDescription>
        </CardHeader>
        <CardContent>
          <ParticipationTrend />
        </CardContent>
      </Card>

      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Commission vs Yield</CardTitle>
          <CardDescription className="text-gray-300">Validator commission rates and yields</CardDescription>
        </CardHeader>
        <CardContent>
          <CommissionYield />
        </CardContent>
      </Card>
    </div>
  )
}
