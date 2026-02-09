// GFLO Backend Connection
const GFLO_CONFIG = {
  backend: 'http://localhost:5000',
  endpoints: {
    status: '/api/status',
    paths: '/api/paths',
    ai: '/ai/oracle',
    xp: '/api/xp'
  }
};

export async function connectToGFLO() {
  try {
    const response = await fetch(`${GFLO_CONFIG.backend}/api/status`);
    const data = await response.json();
    console.log('✅ GFLO Backend connected:', data);
    return data;
  } catch (error) {
    console.log('⚠️ GFLO Backend not available, running in demo mode');
    return { status: 'demo', version: '1.0.0' };
  }
}
