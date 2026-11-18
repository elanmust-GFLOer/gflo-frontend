// Run: node --test src/lib/web3/canonical-address.test.js   (no dependencies)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canonicalAddress, identityState, isDeprecated } from './canonical-address.js'

const V3 = [
  '0x9CF55d0b9D61Dc28EF3cb10765CF4b861Cd0991e',
  '0x414DEDcf9264614Fd087BDa58bE27a0B698CcC54',
  '0xd2C926F67080D6315b5dbBc7D621d729Cfe8A9C7',
  '0x563b2e3b499818a2f84c472efb3169a2667807fe',
]

test('retired v3 contracts are refused in any letter case', () => {
  for (const a of V3) {
    assert.equal(canonicalAddress(a), null)
    assert.equal(canonicalAddress(a.toLowerCase()), null)
    assert.equal(canonicalAddress(' ' + a.toUpperCase().replace('0X', '0x') + ' '), null)
    assert.equal(isDeprecated(a), true)
  }
})

test('unset or malformed values disable the feature', () => {
  for (const v of [undefined, null, '', '   ', '0x123', 'not-an-address', 42]) {
    assert.equal(canonicalAddress(v), null)
  }
})

test('a well-formed canonical address passes', () => {
  assert.equal(canonicalAddress(' 0x' + '11'.repeat(20) + ' '), '0x' + '11'.repeat(20))
})

test('identity responses map fail-closed', () => {
  const piecore = { exists: true, xp: 125, path: 'Praxis', achievedTier: 2, effectiveTier: 1 }
  assert.deepEqual(identityState(200, { piecore }), { status: 'ok', identity: piecore })
  assert.equal(identityState(503, { error: 'canonical_source_unavailable' }).status, 'unavailable')
  assert.equal(identityState(503, { error: 'Chain read failed' }).status, 'error')
  assert.equal(identityState(200, { piecore: { xp: 9999 } }).status, 'error') // old v3 shape
  assert.equal(identityState(500, null).status, 'error')
})
