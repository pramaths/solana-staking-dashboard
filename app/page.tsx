import Header from "@/components/header"
import KpiCards from "@/components/kpi-cards"
import ChartsGrid from "@/components/charts-grid"
import AlertsPanel from "@/components/alerts-panel"
import Footer from "@/components/footer"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <KpiCards />
        <ChartsGrid />
        <AlertsPanel />
        <Footer />
      </div>
    </div>
  )
}
