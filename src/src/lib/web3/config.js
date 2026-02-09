import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org'),
    [baseSepolia.id]: http(import.meta.env.VITE_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'
    })
  ]
});
