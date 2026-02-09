import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// GFLO Contract Addresses (frissítsd deploy után!)
export const GFLO_CONTRACTS = {
  // Mainnet (Base)
  token: '0x...', // GFLOToken
  registry: '0x...', // UserPathRegistry
  sovereign: '0x...', // SovereignModule
  praxis: '0x...', // PraxisModule
  reformer: '0x...', // ReformerModule
  
  // Sepolia Testnet
  sepolia: {
    token: '0x...',
    registry: '0x...',
    sovereign: '0x...'
  }
}

// GFLO ABI-k (ide másolhatod a compiled JSON-ből)
export const GFLO_ABIS = {
  token: [], // GFLOToken ABI
  registry: [], // UserPathRegistry ABI
  sovereign: [] // SovereignModule ABI
}

// RPC URL-ek
export const RPC_URLS = {
  base: import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org',
  baseSepolia: import.meta.env.VITE_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'
}

// Wagmi konfiguráció GFLO-hoz
export const gfloWagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(RPC_URLS.base),
    [baseSepolia.id]: http(RPC_URLS.baseSepolia),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'
    })
  ]
})

// GFLO specifikus hookok
export const GFLO_CHAIN_ID = import.meta.env.VITE_GFLO_CHAIN_ID === '8453' ? base.id : baseSepolia.id

// Helper függvények
export function getCurrentNetwork() {
  return GFLO_CHAIN_ID === base.id ? 'base-mainnet' : 'base-sepolia'
}

export function formatGFLOValue(value, decimals = 18) {
  return (Number(value) / Math.pow(10, decimals)).toFixed(4)
}
