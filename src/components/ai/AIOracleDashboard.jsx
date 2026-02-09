import React, { useState, useEffect } from 'react'
import { gfloAIClient } from '../../lib/api/gflo-ai-client'
import '../../styles/gflo-design-tokens.css'

export function AIOracleDashboard() {
  const [aiStatus, setAiStatus] = useState('connecting')
  const [recommendation, setRecommendation] = useState(null)
  const [gasAdvice, setGasAdvice] = useState(null)
  const [axioms, setAxioms] = useState([])

  useEffect(() => {
    checkAIConnection()
  }, [])

  const checkAIConnection = async () => {
    try {
      const response = await gfloAIClient.getOracleRecommendation('status')
      if (response.error) throw new Error(response.error)
      
      setAiStatus('connected')
      setAxioms(response.axioms || [])
    } catch (error) {
      setAiStatus('demo')
    }
  }

  const getGasAdvice = async () => {
    const advice = await gfloAIClient.checkGasOptimization({
      network: 'base',
      complexity: 'medium'
    })
    setGasAdvice(advice)
  }

  const validateAction = async (action) => {
    const validation = await gfloAIClient.getAxiomsValidation(action)
    return validation
  }

  return (
    <div className="gflo-ai-dashboard p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${aiStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          <h2 className="text-xl font-bold text-white">🤖 AI Guardian</h2>
        </div>
        <span className="text-sm text-purple-300">
          {aiStatus === 'connected' ? 'Oracle Online' : 'Demo Mode'}
        </span>
      </div>

      {/* AI Recommendations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">💡 Oracle Recommendations</h3>
        <div className="p-4 bg-black/30 rounded-xl border border-purple-500/20">
          {recommendation ? (
            <p className="text-gray-200">{recommendation}</p>
          ) : (
            <p className="text-gray-400">Ask AI for optimization advice...</p>
          )}
        </div>
      </div>

      {/* Gas Optimization */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">⛽ Gas Optimization</h3>
        <button
          onClick={getGasAdvice}
          className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:opacity-90 transition"
        >
          Get Gas Advice
        </button>
        {gasAdvice && (
          <div className="mt-3 p-3 bg-black/40 rounded-lg">
            <p className="text-green-400">Optimal Gas: {gasAdvice.optimalGas}</p>
            <p className="text-sm text-gray-300">Confidence: {(gasAdvice.confidence * 100).toFixed(1)}%</p>
          </div>
        )}
      </div>

      {/* Axioms System */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">⚖️ Active Axioms</h3>
        <div className="space-y-2">
          {axioms.length > 0 ? axioms.map((axiom, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-black/20 rounded">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">{axiom}</span>
            </div>
          )) : (
            <div className="p-3 bg-black/30 rounded text-center">
              <p className="text-gray-400">Loading ethical axioms...</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-purple-500/20">
        <p className="text-xs text-center text-purple-300">
          "The AI is not a tool, but the conscience of the system"
        </p>
      </div>
    </div>
  )
}
