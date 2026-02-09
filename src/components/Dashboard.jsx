import React, { useState, useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { GFLOPhilosophy } from './GFLOPhilosophy'

export function Dashboard() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const [aiStatus, setAiStatus] = useState('checking')
  
  useEffect(() => {
    // Szimulált AI kapcsolat ellenőrzés
    setTimeout(() => {
      setAiStatus('demo')
    }, 1000)
  }, [])
  
  const handleConnect = () => {
    if (connectors[0]) {
      connect({ connector: connectors[0] })
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      {/* Fejléc */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🦾 GFLO_Sovereign
            </h1>
            <p className="text-gray-400">Sovereign AI-Web3 Ecosystem</p>
          </div>
          
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Fő tartalom */}
      <main className="max-w-6xl mx-auto">
        {/* AI Status */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${aiStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
            <h2 className="text-xl font-bold">🤖 AI Guardian</h2>
          </div>
          <p className="text-gray-300">
            {aiStatus === 'connected' 
              ? 'AI Oracle is actively monitoring and optimizing' 
              : 'Running in demo mode - connect to backend for full functionality'}
          </p>
        </div>
        
        {/* GFLO Philosophy Components */}
        <GFLOPhilosophy />
        
        {/* Token Balance (Demo) */}
        <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-gray-800">
          <h3 className="text-xl font-bold mb-4">💰 GFLO Token</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/60 rounded-xl">
              <p className="text-gray-400">Your Balance</p>
              <p className="text-2xl font-bold text-green-400">0.00 GFLO</p>
            </div>
            <div className="p-4 bg-black/60 rounded-xl">
              <p className="text-gray-400">Total XP</p>
              <p className="text-2xl font-bold text-yellow-400">0 XP</p>
            </div>
            <div className="p-4 bg-black/60 rounded-xl">
              <p className="text-gray-400">Sovereign Level</p>
              <p className="text-2xl font-bold text-blue-400">Level 1</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold hover:opacity-90 transition">
            🛣️ Create UserPath
          </button>
          <button className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold hover:opacity-90 transition">
            ⛽ Optimize Gas
          </button>
          <button className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl font-semibold hover:opacity-90 transition">
            📊 View Analytics
          </button>
        </div>
      </main>
      
      {/* Lábléc */}
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>GFLO_Sovereign v1.0.0 • Built with ❤️ for the decentralized future</p>
        <p className="mt-2">Backend: {import.meta.env.VITE_GFLO_BACKEND_URL || 'Not connected'}</p>
      </footer>
    </div>
  )
}
