# Solana Staking Health Dashboard

A responsive dashboard for monitoring the health of Solana's staking ecosystem. This dashboard provides a comprehensive view of key metrics such as stake distribution, validator performance, and network participation.

## Live Demo
[View Live Dashboard](https://solana-staking-dashboard-two.vercel.app/)

## Dashboard Preview

### Main Dashboard View
![Preview One](/public/prevone.png)

<br />

### Validator Performance Analytics
![Preview Two](/public/prevtwo.png)

<br />

### Network Statistics Overview
![Preview Three](/public/prevthree.png)

## Features

- **KPI Cards**: Display key metrics including Total SOL Staked, Active Validators, Delinquent Stake %, and Current Epoch
- **Charts**: Visualize data with Pie, Line, Area, and Scatter charts using Recharts
- **Alerts Panel**: Monitor warnings and notifications requiring attention
- **Responsive Design**: Optimized for both desktop and mobile viewing

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui for beautiful, accessible components
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for interactive data visualization
- **Backend**: Vercel Serverless Functions
- **Blockchain**: Solana RPC via Helius API
- **State Management**: React Hooks and Context API
- **Type Safety**: TypeScript for robust development

## Getting Started

1. Clone the repository
2. Install dependencies using npm or yarn
3. Run the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Overview

The Solana Staking Health Dashboard is a comprehensive monitoring tool that provides real-time insights into the Solana staking ecosystem. It's designed to help users track validator performance, stake distribution, and overall network health. The dashboard fetches live data directly from Solana RPC endpoints through Helius API, ensuring users always have access to the most current information.

## Design Choices

- **Next.js 14**: Leveraging App Router for optimal performance and SEO
- **shadcn/ui**: Modern, accessible UI components with dark mode support
- **Vercel Serverless**: Scalable backend with automatic deployments
- **Helius RPC**: Reliable Solana blockchain data access
- **Recharts**: Interactive, responsive charts with custom tooltips
- **Real-Time Data**: All metrics are fetched live from Solana RPC endpoints via Helius API
- **Component-Based UI**: Built with modular React components for maintainability
- **Responsive Design**: Optimized for both desktop and mobile viewing using Tailwind CSS

## Data Sources

- **Solana RPC via Helius**: Primary data source for all blockchain metrics
- **Real-Time Updates**: No cached or stale data - fresh fetches on every page load
- **Comprehensive Metrics**: Includes stake distribution, validator performance, commission rates, and network health indicators

## Key Metrics

- **Total SOL Staked**: Current amount of SOL staked across the network
- **Active Validators**: Number of validators actively participating in consensus
- **Delinquent Stake %**: Percentage of stake delegated to non-participating validators
- **Current Epoch**: Network epoch number and progress
- **Commission vs Yield**: Validator commission rates and corresponding yields
- **Validator Performance**: Blocks produced vs skipped, uptime metrics
- **Top 10 Validators**: Stake distribution among leading validators
- **Network Health**: Overall network participation and performance metrics

## Dashboard Features

- **Real-Time KPI Cards**: Live updates of critical network metrics
- **Interactive Charts**:
  - Stake Distribution (Pie Chart)
  - Validator Performance (Line/Bar Charts)
  - Commission vs Yield (Scatter Plot)
  - Network Participation (Area Chart)
- **Alerts System**: Real-time notifications for:
  - Non-participating validators
  - High delinquency rates
  - Network performance issues
- **Responsive Layout**: Adapts to desktop and mobile screens
- **Tabbed Interface**: Easy navigation between different metric views

## Technical Implementation

The dashboard is built using Next.js 14 with App Router for optimal performance and SEO. The UI is crafted with shadcn/ui components and styled using Tailwind CSS, providing a modern and responsive interface. Data visualization is handled by Recharts, offering interactive and responsive charts with custom tooltips and animations. The backend is deployed on Vercel's serverless platform, which efficiently handles API and RPC calls to the Solana blockchain via Helius. The application is structured with modular React components and TypeScript for type safety, ensuring maintainability and scalability. All data is fetched in real-time from Solana RPC endpoints, with no caching to ensure users always see the most current network state.

## Real-Time Updates

- **Live Data Fetching**: All metrics are fetched directly from Helius RPC endpoints
- **Real-Time Data**: No dummy data - all information is pulled live from the Solana blockchain
- **Efficient Polling**: Optimized RPC calls to minimize network load while maintaining data freshness
- **Error Handling**: Graceful degradation when RPC endpoints are unavailable

## Conclusion

The Solana Staking Health Dashboard provides a powerful, real-time window into the Solana staking ecosystem. By leveraging Vercel's serverless architecture and Helius's RPC endpoints, it delivers up-to-the-minute insights into validator performance, stake distribution, and network health. The dashboard's responsive design and comprehensive metrics make it an essential tool for both casual users and advanced stakers monitoring the Solana network.

## Replacing Dummy Data with RPC Calls

This dashboard currently uses dummy data located in `lib/dummy-data.ts`. To integrate with real Solana RPC, set up Solana Web3.js, create a service to handle RPC calls, and update components to use real data instead of dummy data. Implement data refresh functionality in the header for real-time updates.

## License

MIT
