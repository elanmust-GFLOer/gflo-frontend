// GFLO Backend API Client
const API_BASE = import.meta.env.VITE_GFLO_BACKEND_URL || 'http://localhost:5000';

export const gfloAPI = {
  async getStatus() {
    try {
      const res = await fetch(`${API_BASE}/api/status`);
      return await res.json();
    } catch (error) {
      return { status: 'offline', message: 'Backend not available' };
    }
  },

  async getAIOracleRecommendation() {
    try {
      const res = await fetch(`${API_BASE}/ai/oracle`);
      return await res.json();
    } catch (error) {
      return { 
        recommendation: 'AI Oracle in demo mode. Connect backend for real insights.',
        mode: 'demo'
      };
    }
  },

  async getUserPaths(address) {
    try {
      const res = await fetch(`${API_BASE}/api/paths/${address}`);
      return await res.json();
    } catch (error) {
      return { paths: [], totalXP: 0 };
    }
  },

  async createUserPath(pathData) {
    try {
      const res = await fetch(`${API_BASE}/api/paths/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pathData)
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: 'Backend unavailable' };
    }
  }
};

export default gfloAPI;
