import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { gfloWagmiConfig } from './lib/web3/gflo-web3-config'
import { Dashboard } from './components/Dashboard'
import ElanMustAI from './components/ElanMustAI'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={gfloWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai" element={<ElanMustAI />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
