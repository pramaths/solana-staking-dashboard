import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  // In a real app, this would be fetched from an API
  const lastRefreshed = new Date().toLocaleTimeString()

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2 sm:mb-0">Solana Staking Health</h1>
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span>Last refreshed: {lastRefreshed}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#1e2a45]">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh data</span>
        </Button>
      </div>
    </div>
  )
}
