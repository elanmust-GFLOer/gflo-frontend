import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const GFLO_CONTRACTS = {
  token: '0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532',
  registry: '0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532',
  sovereign: '0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532',
  
  sepolia: {
    token: '0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532',
    registry: '0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532',
    sovereign: '0x2ebCCEdAFA8D7Da99Ed5d342342F0EA0C3895532'
  }
};

export const GFLO_ABIS = {
  token: [
    {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
  ],
  registry: [],
  sovereign: []
};

export const RPC_URLS = {
  base: 'https://mainnet.base.org',
  baseSepolia: 'https://sepolia.infura.io/v3/52c5b898077a4686becc8db02ba0bfc5'
};

export const gfloWagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(RPC_URLS.base),
    [baseSepolia.id]: http(RPC_URLS.baseSepolia),
  },
  connectors: [injected()]
});

export const GFLO_CHAIN_ID = 11155111;

export function getCurrentNetwork() { return 'base-sepolia'; }

export function formatGFLOValue(value, decimals = 18) {
  return (Number(value) / Math.pow(10, decimals)).toFixed(4);
}
