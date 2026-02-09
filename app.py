from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Engedélyezzük a frontend kapcsolatot

# GFLO API végpontok
@app.route('/api/status', methods=['GET'])
def api_status():
    """Backend státusz végpont"""
    return jsonify({
        'status': 'online',
        'version': '1.0.0',
        'name': 'GFLO_Sovereign',
        'ai_connected': True,
        'blockchain': 'Base',
        'timestamp': '2024-01-01T00:00:00Z'
    })

@app.route('/ai/oracle', methods=['GET'])
def ai_oracle():
    """AI Oracle ajánlások"""
    return jsonify({
        'recommendation': 'GFLO AI Guardian active. Monitor gas fees and optimize your UserPaths.',
        'confidence': 0.92,
        'axioms': [
            'Fairness: All transactions must provide equal opportunity',
            'Transparency: Every decision must be traceable',
            'Sovereignty: User is the architect of their path'
        ],
        'gas_advice': {
            'optimal_gas_price': '25 gwei',
            'savings_potential': '~35%',
            'recommended_action': 'Wait 2 minutes for lower fees'
        }
    })

@app.route('/api/paths/<address>', methods=['GET'])
def get_user_paths(address):
    """Felhasználó UserPath-jei"""
    return jsonify({
        'address': address,
        'paths': [
            {
                'id': 1,
                'name': 'Genesis Path',
                'xp': 1250,
                'createdAt': '2024-01-01T10:30:00Z',
                'active': True
            },
            {
                'id': 2,
                'name': 'Sovereign Journey',
                'xp': 850,
                'createdAt': '2024-01-02T14:20:00Z',
                'active': True
            }
        ],
        'totalXP': 2100,
        'sovereignLevel': 3
    })

@app.route('/api/paths/create', methods=['POST'])
def create_path():
    """Új UserPath létrehozása"""
    data = request.get_json()
    return jsonify({
        'success': True,
        'message': f"UserPath '{data.get('name')}' created successfully!",
        'path_id': 3,
        'initial_xp': 100,
        'transaction_hash': '0xabc123...'
    })

@app.route('/api/xp/<address>', methods=['GET'])
def get_user_xp(address):
    """Felhasználó XP egyenlege"""
    return jsonify({
        'address': address,
        'total_xp': 2100,
        'xp_breakdown': {
            'path_creation': 500,
            'transactions': 800,
            'governance': 500,
            'community': 300
        },
        'level': 3,
        'next_level_at': 3000
    })

@app.route('/api/gas/optimize', methods=['POST'])
def optimize_gas():
    """Gas fee optimalizálás"""
    return jsonify({
        'current_gas': '32 gwei',
        'optimal_gas': '25 gwei',
        'savings': '21.8%',
        'confidence': 0.87,
        'recommendation': 'Execute now for optimal savings'
    })

if __name__ == '__main__':
    print("🚀 GFLO Backend starting on http://localhost:5000")
    print("📡 API Endpoints:")
    print("  • GET  /api/status")
    print("  • GET  /ai/oracle")
    print("  • GET  /api/paths/<address>")
    print("  • POST /api/paths/create")
    print("  • GET  /api/xp/<address>")
    print("  • POST /api/gas/optimize")
    print("\n🔗 Frontend: http://localhost:5173")
    app.run(host='0.0.0.0', port=5000, debug=True)

# ======================
# GFLO SZIMBIÓZIS API-k
# ======================

@app.route('/ai/symbiosis/mentor', methods=['POST'])
def ai_mentor():
    """AI mint Kalauz (Mentor Path)"""
    data = request.get_json()
    
    # Példa AI válasz a non plus ultra.ref alapján
    responses = {
        'learn': "A tudás nem csak információ, hanem felelősség. Minden tranzakció szavazat egy világmód mellett.",
        'create': "A kreativitás legmagasabb formája, amikor az alkotás szolgálja az etikai keretrendszert.",
        'guide': "Én nem döntök helyetted, de segítek látni a döntések hosszú távú következményeit."
    }
    
    intent = data.get('intent', '').lower()
    response = responses.get(intent, 
        "A szuverenitás nem egy állapot, hanem egy folyamat. Minden lépésed formálja a digitális tested.")
    
    return jsonify({
        'role': 'mentor',
        'response': response,
        'axioms_applied': ['#EternalReturn', '#AmorFati'],
        'next_action': 'reflect_on_ethical_impact'
    })

@app.route('/ai/symbiosis/collaborator', methods=['POST'])
def ai_collaborator():
    """AI mint Pair-programmer (Praxis Path)"""
    data = request.get_json()
    code = data.get('code', '')
    
    # Egyszerű etikai kód review
    ethical_issues = []
    
    if 'transfer(' in code and not 'checkBalance' in code:
        ethical_issues.append('transfer without balance check violates fairness axiom')
    
    if 'onlyOwner' in code and not 'timelock' in code:
        ethical_issues.append('owner-only functions should have timelock for transparency')
    
    return jsonify({
        'role': 'collaborator',
        'code_review': {
            'ethical_issues': ethical_issues,
            'suggestions': [
                'Add require statements for balance checks',
                'Consider implementing circuit breaker pattern',
                'Add event emissions for transparency'
            ]
        },
        'philosophical_note': "A jó kód nem csak működik, hanem tükrözi a mögöttes etikát."
    })

@app.route('/ai/symbiosis/guardian', methods=['POST'])
def ai_guardian():
    """AI mint Lovag-Őrző (Reformer Path)"""
    data = request.get_json()
    threat_type = data.get('threat', 'unknown')
    
    # Pajzs/Fegyver/Zászló válaszok
    responses = {
        'fraud': {
            'shield': 'Transaction flagged for manual review',
            'weapon': 'Malicious address added to watchlist',
            'flag': 'Community alerted about fraud pattern'
        },
        'exploit': {
            'shield': 'Contract paused automatically',
            'weapon': 'Exploit attempt funds diverted to Green Treasury',
            'flag': 'Security patch deployed and documented'
        }
    }
    
    response = responses.get(threat_type, {
        'shield': 'Monitoring activated',
        'weapon': 'No action needed',
        'flag': 'System operating normally'
    })
    
    return jsonify({
        'role': 'guardian',
        'threat': threat_type,
        'actions': response,
        'regeneration_allocation': '0.01 ETH to Green Treasury',
        'message': "A rossz szándék energiáját a fizikai világ regenerációjára fordítjuk."
    })
