import { useCanonicalIdentity } from './useCanonicalIdentity'

// XP and tier come from the canonical, fail-closed backend read path, never from the
// retired v3 PIECore (self-mintable XP). `tier` is the EFFECTIVE tier: the only one
// that may grant privileges. Path creation is not implemented on chain.
export function useUserPaths() {
  const rep = useCanonicalIdentity()
  const ok = rep.status === 'ok' && rep.identity.exists

  const createUserPath = async () => {
    throw new Error('Path creation is not available yet.')
  }

  return {
    status: rep.status,
    paths: [],
    xp: ok ? Number(rep.identity.xp) : null,
    tier: ok ? Number(rep.identity.effectiveTier) : null,
    createUserPath,
    isCreating: false,
    refetchPaths: async () => {},
    registryAddress: null
  }
}
