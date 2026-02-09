import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { Dashboard } from './components/Dashboard'
import './index.css'

// Egyszerű Web3 konfig (demo módban)
import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
  connectors: [injected()]
})

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
