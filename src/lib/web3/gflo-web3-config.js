import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { canonicalAddress } from './canonical-address.js'

// No hard-coded contract addresses. The retired Sepolia v3 contracts (self-mintable XP,
// stake-based XP, open-mint token) are refused even if an env variable still holds them.
// Reputation (XP, tier) is NOT read from chain here: it comes from the backend
// /api/identity endpoint, which reads the canonical PIE v0.2 path and fails closed.
export const GFLO_CONTRACTS = {
  token: canonicalAddress(import.meta.env.VITE_GFLO_TOKEN_ADDRESS), // GFLOFixedSupplyV01, once deployed
}

export const GFLO_BACKEND_URL =
  import.meta.env.VITE_GFLO_BACKEND_URL ||
  import.meta.env.VITE_AI_URL ||
  'https://web-gflo-sov-f4a65.up.railway.app'

export const GFLO_ABIS = {
  token: [
    {"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}
  ],
}

export const gfloWagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://sepolia.drpc.org'),
  },
  connectors: [injected()],
})

export const GFLO_CHAIN_ID = 11155111
