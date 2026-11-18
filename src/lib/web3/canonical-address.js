// Fail-closed contract address handling, mirrored from gflo-backend/gflo_config.py.
// An address is usable only if it is configured, well-formed and NOT a retired
// Sepolia v3 contract (see gflo-pie/docs/DECISION-001-v3-retirement.md).
// No hard-coded defaults: a missing variable disables the feature.

export const DEPRECATED_V3_ADDRESSES = new Set([
  '0x9cf55d0b9d61dc28ef3cb10765cf4b861cd0991e', // PIECore v3: public gainXP(), self-mintable XP
  '0x414dedcf9264614fd087bda58be27a0b698ccc54', // GFLOIgnition v3
  '0xd2c926f67080d6315b5dbbc7d621d729cfe8a9c7', // GasFeeLoop: stake-multiplied XP
  '0x563b2e3b499818a2f84c472efb3169a2667807fe', // MockGFLOToken: open faucet() mint
])

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/

export function isDeprecated(address) {
  return typeof address === 'string' && DEPRECATED_V3_ADDRESSES.has(address.trim().toLowerCase())
}

/** Returns the trimmed address, or null when unset, malformed or retired. */
export function canonicalAddress(value) {
  if (typeof value !== 'string') return null
  const address = value.trim()
  if (!ADDRESS_RE.test(address) || isDeprecated(address)) return null
  return address
}

/** Maps an /api/identity response to a UI state. Anything unexpected is "unavailable". */
export function identityState(httpStatus, body) {
  if (httpStatus === 200 && body && body.piecore && typeof body.piecore.exists === 'boolean') {
    return { status: 'ok', identity: body.piecore }
  }
  if (httpStatus === 503 && body && body.error === 'canonical_source_unavailable') {
    return { status: 'unavailable', identity: null }
  }
  return { status: 'error', identity: null }
}
