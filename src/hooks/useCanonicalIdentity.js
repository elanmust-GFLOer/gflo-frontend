import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { GFLO_BACKEND_URL } from '../lib/web3/gflo-web3-config'
import { identityState } from '../lib/web3/canonical-address.js'

/**
 * Canonical reputation for the connected wallet, from the backend's fail-closed
 * /api/identity endpoint. status: 'loading' | 'ok' | 'unavailable' | 'error'.
 * 'unavailable' = no canonical PIE v0.2 deployment yet; legacy v3 XP is never shown.
 */
export function useCanonicalIdentity() {
  const { address } = useAccount()
  const query = useQuery({
    queryKey: ['gflo-identity', address],
    enabled: !!address,
    retry: false,
    queryFn: async () => {
      try {
        const res = await fetch(`${GFLO_BACKEND_URL}/api/identity/${address}`)
        let body = null
        try { body = await res.json() } catch { body = null }
        return identityState(res.status, body)
      } catch {
        return { status: 'error', identity: null }
      }
    },
  })
  if (!address || query.isLoading || !query.data) return { status: 'loading', identity: null }
  return query.data
}
