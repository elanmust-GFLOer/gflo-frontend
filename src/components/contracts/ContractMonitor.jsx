import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead, useBlockNumber } from 'wagmi';
import { gfloTokenABI, registryABI, sovereignABI } from '../lib/abis';

export function ContractMonitor() {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  
  const [contractStats, setContractStats] = useState({
    tokenSupply: '0',
    totalPaths: '0',
    activeUsers: '0',
    gasUsed: '0'
  });

  // GFLO Token total supply
  const { data: tokenSupply } = useContractRead({
    address: import.meta.env.VITE_GFLO_TOKEN_ADDRESS,
    abi: gfloTokenABI,
    functionName: 'totalSupply',
    watch: true
  });

  // UserPathRegistry stats
  const { data: totalPaths } = useContractRead({
    address: import.meta.env.VITE_REGISTRY_ADDRESS,
    abi: registryABI,
    functionName: 'getTotalPaths',
    watch: true
  });

  // User-specific data
  const { data: userPaths } = useContractRead({
    address: import.meta.env.VITE_REGISTRY_ADDRESS,
    abi: registryABI,
    functionName: 'getUserPaths',
    args: [address],
    enabled: !!address,
    watch: true
  });

  useEffect(() => {
    if (tokenSupply) {
      setContractStats(prev => ({
        ...prev,
        tokenSupply: (parseInt(tokenSupply.toString()) / 1e18).toFixed(2)
      }));
    }

    if (totalPaths) {
      setContractStats(prev => ({
        ...prev,
        totalPaths: totalPaths.toString()
      }));
    }
  }, [tokenSupply, totalPaths, blockNumber]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Token Supply */}
      <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-300">Total GFLO Supply</p>
            <p className="text-2xl font-bold">{contractStats.tokenSupply}</p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
        <div className="mt-2 text-xs text-blue-400">
          Updated at block #{blockNumber?.toString()}
        </div>
      </div>

      {/* Total Paths */}
      <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-300">Total UserPaths</p>
            <p className="text-2xl font-bold">{contractStats.totalPaths}</p>
          </div>
          <div className="text-3xl">🛣️</div>
        </div>
        <div className="mt-2 text-xs text-purple-400">
          {userPaths ? `${userPaths.length} your paths` : 'Connect wallet'}
        </div>
      </div>

      {/* Active Users */}
      <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-300">Active Users</p>
            <p className="text-2xl font-bold">
              {contractStats.totalPaths > 0 ? Math.min(contractStats.totalPaths * 2, 1000) : '0'}
            </p>
          </div>
          <div className="text-3xl">👥</div>
        </div>
        <div className="mt-2 text-xs text-green-400">
          Estimated from path count
        </div>
      </div>

      {/* Network Status */}
      <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl border border-yellow-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-300">Network</p>
            <p className="text-xl font-bold">
              {import.meta.env.VITE_GFLO_CHAIN_ID === '84532' ? 'Base Sepolia' : 'Base Mainnet'}
            </p>
          </div>
          <div className="text-3xl">🌐</div>
        </div>
        <div className="mt-2 text-xs text-yellow-400">
          Block #{blockNumber?.toString()}
        </div>
      </div>
    </div>
  );
}
