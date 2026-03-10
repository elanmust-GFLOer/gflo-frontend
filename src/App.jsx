import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { gfloWagmiConfig } from './lib/web3/gflo-web3-config'
import { Dashboard } from './components/Dashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={gfloWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
