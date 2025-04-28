'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/alerts")
        const data = await res.json()
        if (data.success) {
          setAlerts(data.alerts)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [])

  if (loading) {
    return (
      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-white">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300">Loading alerts...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-white">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-400">Failed to load alerts.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#131a2c] border-[#1e2a45] shadow-lg mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-white">Alerts</CardTitle>
          </div>
          <Badge variant="outline" className="text-amber-400 border-amber-400">
            {alerts.length} Active
          </Badge>
        </div>
        <CardDescription className="text-gray-300">Warnings and notifications requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#1e2a45] hover:bg-[#1a2438]">
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">Validator</TableHead>
              <TableHead className="text-gray-300">Value</TableHead>
              <TableHead className="text-gray-300">Timestamp</TableHead>
              <TableHead className="text-gray-300 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className="border-[#1e2a45] hover:bg-[#1a2438]">
                <TableCell>
                  <Badge variant={alert.severity === "warning" ? "destructive" : "secondary"}>{alert.type}</Badge>
                </TableCell>
                <TableCell className="font-medium text-white">{alert.validator}</TableCell>
                <TableCell className="text-white">{alert.value}</TableCell>
                <TableCell className="text-gray-300">{alert.timestamp}</TableCell>
                <TableCell className="text-right">
                  <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm">
                    Details
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
