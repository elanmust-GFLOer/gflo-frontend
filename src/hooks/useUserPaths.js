import { useReadContract, useAccount } from 'wagmi'
import { GFLO_CONTRACTS, GFLO_ABIS, GFLO_CHAIN_ID } from '../lib/web3/gflo-web3-config'

export function useUserPaths() {
  const { address } = useAccount()
  // A registry nincs konfigurálva itt; helyette a pieCore kontraktusból kérünk XP/tier információt.
  const pieCoreAddress = GFLO_CONTRACTS.pieCore

  const { data: xpRaw } = useReadContract({
    address: pieCoreAddress,
    abi: GFLO_ABIS.pieCore,
    functionName: 'getXP',
    args: [address],
    chainId: GFLO_CHAIN_ID,
    query: { enabled: !!address }
  })

  const { data: tierRaw } = useReadContract({
    address: pieCoreAddress,
    abi: GFLO_ABIS.pieCore,
    functionName: 'getTier',
    args: [address],
    chainId: GFLO_CHAIN_ID,
    query: { enabled: !!address }
  })

  const xp = xpRaw ? Number(xpRaw) / 1e18 : 0
  const tier = tierRaw ? Number(tierRaw) : 0

  // Ha a registry később hozzáadódik a GFLO_CONTRACTS-hoz, ezt a hookot vissza lehet bővíteni a paths és createUserPath funkciókkal.
  const createUserPath = async () => {
    throw new Error('Registry contract not configured. createUserPath is unavailable.')
  }

  return {
    paths: [],
    xp,
    tier,
    createUserPath,
    isCreating: false,
    refetchPaths: async () => {},
    registryAddress: null
  }
}
