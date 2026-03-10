import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const GFLO_CONTRACTS = {
  token: '0x563b2e3b499818a2f84c472efb3169a2667807fe',
  pieCore: '0x9CF55d0b9D61Dc28EF3cb10765CF4b861Cd0991e',
  ignition: '0x414DEDcf9264614Fd087BDa58bE27a0B698CcC54',
  gasFeeLoop: '0xd2C926F67080D6315b5dbBc7D621d729Cfe8A9C7',
}

export const GFLO_ABIS = {
  token: [
    {"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}
  ],
  pieCore: [
    {"inputs":[{"name":"user","type":"address"}],"name":"getXP","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"user","type":"address"}],"name":"getTier","outputs":[{"name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"user","type":"address"}],"name":"identities","outputs":[{"name":"xp","type":"uint256"},{"name":"path","type":"uint8"},{"name":"tier","type":"uint8"}],"stateMutability":"view","type":"function"}
  ],
  gasFeeLoop: [
    {"inputs":[{"name":"user","type":"address"}],"name":"getStake","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"user","type":"address"}],"name":"getAccumulatedXP","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}
  ]
}

export const gfloWagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://sepolia.drpc.org'),
  },
  connectors: [injected()],
})

export const GFLO_CHAIN_ID = 11155111
