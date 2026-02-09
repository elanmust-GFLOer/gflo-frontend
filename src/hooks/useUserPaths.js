import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { GFLO_CONTRACTS, GFLO_ABIS, GFLO_CHAIN_ID } from '../lib/web3/gflo-web3-config'

export function useUserPaths() {
  const { address } = useAccount()
  const registryAddress = GFLO_CONTRACTS.registry

  // UserPath-ek lekérdezése
  const { data: userPaths, refetch: refetchPaths } = useReadContract({
    address: registryAddress,
    abi: GFLO_ABIS.registry,
    functionName: 'getUserPaths',
    args: [address],
    chainId: GFLO_CHAIN_ID,
    query: {
      enabled: !!address
    }
  })

  // Új UserPath létrehozása
  const { writeContract: createPath, isPending: isCreating } = useWriteContract()

  const createUserPath = async (pathName, metadata) => {
    return createPath({
      address: registryAddress,
      abi: GFLO_ABIS.registry,
      functionName: 'createUserPath',
      args: [pathName, JSON.stringify(metadata)],
      chainId: GFLO_CHAIN_ID
    })
  }

  // XP lekérdezése
  const { data: userXP } = useReadContract({
    address: registryAddress,
    abi: GFLO_ABIS.registry,
    functionName: 'getUserXP',
    args: [address],
    chainId: GFLO_CHAIN_ID,
    query: {
      enabled: !!address
    }
  })

  return {
    paths: userPaths || [],
    xp: userXP ? Number(userXP) : 0,
    createUserPath,
    isCreating,
    refetchPaths,
    registryAddress
  }
}
