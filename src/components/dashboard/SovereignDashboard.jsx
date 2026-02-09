import React from 'react'
import { useAccount } from 'wagmi'
import { useGFLOToken } from '../../hooks/useGFLOToken'
import { useUserPaths } from '../../hooks/useUserPaths'
import { AIOracleDashboard } from '../ai/AIOracleDashboard'
import { GFLOPhilosophyProvider, useGFLOPhilosophy } from '../../context/GFLOPhilosophyContext'
import '../../styles/gflo-design-tokens.css'

function DashboardContent() {
  const { address, isConnected } = useAccount()
  const { balance, totalSupply } = useGFLOToken()
  const { paths, xp } = useUserPaths()
  const philosophy = useGFLOPhilosophy()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      {/* Fejléc - GFLO Manifestó */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🦾 GFLO_Sovereign
            </h1>
            <p className="text-gray-400 mt-2">{philosophy.sovereignLogic.quote}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                  <p className="text-xs text-green-400">● Connected</p>
                </div>
              </div>
            ) : (
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* 3 Oszlop - A GFLO Filozófia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sovereign Logic */}
          <div className="gflo-sovereign-glow p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-transparent border border-blue-500/30">
            <div className="text-3xl mb-3">👑</div>
            <h3 className="text-xl font-bold mb-2">Sovereign Logic</h3>
            <p className="text-gray-300 mb-4">{philosophy.sovereignLogic.principle}</p>
            <div className="p-3 bg-black/40 rounded-lg">
              <p className="text-sm text-blue-300">Active UserPaths: {paths.length}</p>
              <p className="text-2xl font-bold text-white mt-2">{xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* AI Guardian */}
          <div className="gflo-ai-glow p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-500/30">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Guardian</h3>
            <p className="text-gray-300 mb-4">{philosophy.aiGuardian.principle}</p>
            <div className="p-3 bg-black/40 rounded-lg">
              <p className="text-sm text-purple-300">Oracle Status: Active</p>
              <p className="text-2xl font-bold text-white mt-2">Real-time AI</p>
            </div>
          </div>

          {/* Ethics Driven */}
          <div className="gflo-ethics-border p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-transparent">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-xl font-bold mb-2">Ethics-Driven</h3>
            <p className="text-gray-300 mb-4">{philosophy.ethicsDriven.principle}</p>
            <div className="p-3 bg-black/40 rounded-lg">
              <p className="text-sm text-green-300">Fraud Detection: Active</p>
              <p className="text-2xl font-bold text-white mt-2">100% Transparent</p>
            </div>
          </div>
        </div>

        {/* Tokenomikai Adatok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* GFLO Token Balances */}
          <div className="p-6 rounded-2xl bg-black/40 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">💰 GFLO Tokenomics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Your Balance</span>
                <span className="text-2xl font-bold text-green-400">{balance.toFixed(2)} GFLO</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Supply</span>
                <span className="text-xl text-blue-400">{totalSupply.toFixed(0)} GFLO</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Market Position</span>
                <span className="text-yellow-400">Sovereign Rank #1</span>
              </div>
            </div>
          </div>

          {/* AI Oracle Dashboard */}
          <AIOracleDashboard />
        </div>

        {/* UserPaths Management */}
        <div className="p-6 rounded-2xl bg-black/40 border border-gray-800 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">🛣️ Your Sovereign Paths</h3>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition">
              + Create New Path
            </button>
          </div>
          
          {paths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paths.slice(0, 3).map((path, idx) => (
                <div key={idx} className="p-4 bg-black/60 rounded-xl border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Path #{idx + 1}</h4>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      Level {Math.floor(xp / 1000) + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{path.name || 'Unnamed Path'}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">XP: {xp}</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🛣️</div>
              <p className="text-gray-400 mb-4">No sovereign paths created yet</p>
              <p className="text-sm text-gray-500">Create your first UserPath to begin your sovereign journey</p>
            </div>
          )}
        </div>

        {/* GFLO Manifestó Részlet */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30">
          <h3 className="text-xl font-bold mb-4">🌐 GFLO Manifestó</h3>
          <div className="space-y-3 text-gray-300">
            <p>"GFLO is not a simple dApp, but a self-regulating digital organism."</p>
            <p>"The user is not just a subject of the protocol, but an active shaper of their own path."</p>
            <p>"AI is not an external tool, but the 'conscience' of the system."</p>
            <p className="pt-4 text-sm text-blue-300">
              Complete manifesto: <a href="#" className="underline hover:text-blue-200">docs/GFLO_MANIFESTO.md</a>
            </p>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            <p>GFLO_Sovereign v1.0.0 • Built with ❤️ for the decentralized future</p>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-400">Documentation</a>
            <a href="#" className="hover:text-blue-400">Smart Contracts</a>
            <a href="#" className="hover:text-blue-400">AI Oracle</a>
            <a href="#" className="hover:text-blue-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function SovereignDashboard() {
  return (
    <GFLOPhilosophyProvider>
      <DashboardContent />
    </GFLOPhilosophyProvider>
  )
}
