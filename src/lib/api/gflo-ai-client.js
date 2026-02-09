// GFLO AI Oracle API kliense
const GFLO_AI_BASE_URL = import.meta.env.VITE_GFLO_AI_URL || 'http://localhost:5000/ai'

class GFLOAIClient {
  constructor() {
    this.baseUrl = GFLO_AI_BASE_URL
  }

  async getOracleRecommendation(query) {
    try {
      const response = await fetch(`${this.baseUrl}/oracle/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      return response.json()
    } catch (error) {
      console.error('AI Oracle error:', error)
      return { error: 'AI Oracle unavailable', mode: 'demo' }
    }
  }

  async checkGasOptimization(txData) {
    try {
      const response = await fetch(`${this.baseUrl}/gas/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txData)
      })
      return response.json()
    } catch (error) {
      console.error('Gas optimization error:', error)
      return { optimalGas: 'auto', confidence: 0 }
    }
  }

  async detectFraudPattern(txHistory) {
    try {
      const response = await fetch(`${this.baseUrl}/fraud/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions: txHistory })
      })
      return response.json()
    } catch (error) {
      console.error('Fraud detection error:', error)
      return { fraudScore: 0, warnings: [] }
    }
  }

  async getAxiomsValidation(proposedAction) {
    try {
      const response = await fetch(`${this.baseUrl}/axioms/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposedAction)
      })
      return response.json()
    } catch (error) {
      console.error('Axioms validation error:', error)
      return { valid: true, axioms: [] }
    }
  }
}

export const gfloAIClient = new GFLOAIClient()
