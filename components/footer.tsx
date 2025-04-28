import { ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-400">
      <div className="flex items-center justify-center gap-1">
        <span>Built with Solana RPC</span>
        <a
          href="https://www.helius.dev/blog?q=token+t#results"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </footer>
  )
}
