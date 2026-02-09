import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { GFLO_CONTRACTS, GFLO_ABIS, GFLO_CHAIN_ID } from '../lib/web3/gflo-web3-config'

export function useGFLOToken() {
  const { address } = useAccount()
  const tokenAddress = GFLO_CONTRACTS.token

  // Token egyenleg
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: tokenAddress,
    abi: GFLO_ABIS.token,
    functionName: 'balanceOf',
    args: [address],
    chainId: GFLO_CHAIN_ID,
    query: {
      enabled: !!address
    }
  })

  // Összes kínálat
  const { data: totalSupply } = useReadContract({
    address: tokenAddress,
    abi: GFLO_ABIS.token,
    functionName: 'totalSupply',
    chainId: GFLO_CHAIN_ID
  })

  // Tranzakció
  const { writeContract: transfer, isPending: isTransferring } = useWriteContract()

  const transferTokens = async (to, amount) => {
    return transfer({
      address: tokenAddress,
      abi: GFLO_ABIS.token,
      functionName: 'transfer',
      args: [to, BigInt(amount * 1e18)],
      chainId: GFLO_CHAIN_ID
    })
  }

  return {
    balance: balance ? Number(balance) / 1e18 : 0,
    totalSupply: totalSupply ? Number(totalSupply) / 1e18 : 0,
    transferTokens,
    isTransferring,
    refetchBalance,
    tokenAddress
  }
}
