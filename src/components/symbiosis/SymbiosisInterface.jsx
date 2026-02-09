import React, { useState } from 'react';
import { useAccount } from 'wagmi';

export function SymbiosisInterface() {
  const { address } = useAccount();
  const [humanIntent, setHumanIntent] = useState('');
  const [aiRole, setAiRole] = useState('mentor');
  const [conversation, setConversation] = useState([]);
  const [regenerationScore, setRegenerationScore] = useState(0);

  const submitIntent = async () => {
    if (!humanIntent.trim()) return;
    
    // Új beszélgetés elem hozzáadása
    const newEntry = {
      human: humanIntent,
      timestamp: new Date().toISOString(),
      role: aiRole
    };
    
    // API hívás a megfelelő AI testhez
    const endpoint = `/ai/symbiosis/${aiRole}`;
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: humanIntent,
        address: address,
        context: 'symbiosis'
      })
    });
    
    const aiData = await response.json();
    
    // AI válasz hozzáadása
    newEntry.ai = aiData;
    
    // Regenerációs pontok frissítése
    if (aiData.regeneration_allocation) {
      setRegenerationScore(prev => prev + 1);
    }
    
    // Beszélgetés frissítése
    setConversation(prev => [newEntry, ...prev.slice(0, 9)]); // Legutóbbi 10
    setHumanIntent('');
  };

  const renderAIResponse = (response) => {
    switch (response.role) {
      case 'mentor':
        return (
          <div className="p-4 bg-gradient-to-r from-blue-900/30 to-transparent rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🧙‍♂️</span>
              <span className="font-bold text-blue-300">Mentor AI</span>
            </div>
            <p className="text-gray-200">{response.response}</p>
            <div className="mt-2 text-sm text-blue-400">
              Axioms: {response.axioms_applied?.join(', ')}
            </div>
          </div>
        );
        
      case 'collaborator':
        return (
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-transparent rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👨‍💻</span>
              <span className="font-bold text-purple-300">Collaborator AI</span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-200">{response.code_review?.philosophical_note}</p>
              {response.code_review?.ethical_issues?.length > 0 && (
                <div className="bg-black/40 p-3 rounded">
                  <p className="text-red-300 font-medium">Ethical Issues:</p>
                  <ul className="list-disc pl-5 text-sm">
                    {response.code_review.ethical_issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'guardian':
        return (
          <div className="p-4 bg-gradient-to-r from-green-900/30 to-transparent rounded-xl border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛡️</span>
              <span className="font-bold text-green-300">Guardian AI</span>
            </div>
            <p className="text-gray-200 mb-3">{response.message}</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 p-2 rounded text-center">
                <p className="text-sm text-yellow-300">Shield</p>
                <p className="text-xs">{response.actions?.shield}</p>
              </div>
              <div className="bg-black/40 p-2 rounded text-center">
                <p className="text-sm text-red-300">Weapon</p>
                <p className="text-xs">{response.actions?.weapon}</p>
              </div>
              <div className="bg-black/40 p-2 rounded text-center">
                <p className="text-sm text-green-300">Flag</p>
                <p className="text-xs">{response.actions?.flag}</p>
              </div>
            </div>
            {response.regeneration_allocation && (
              <div className="mt-3 p-2 bg-green-900/20 rounded text-center">
                <p className="text-sm text-green-400">♻️ {response.regeneration_allocation}</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Regenerációs Pontok */}
      <div className="text-center p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl border border-emerald-500/30">
        <h3 className="text-xl font-bold mb-2">🌱 Regenerációs Pontok</h3>
        <div className="flex items-center justify-center gap-4">
          <div className="text-3xl">{regenerationScore}</div>
          <div className="text-left">
            <p className="text-sm text-gray-300">Minden etikus interakció</p>
            <p className="text-sm text-gray-300">hozzájárul a Green Treasury-hez</p>
          </div>
        </div>
      </div>

      {/* AI Test Választó */}
      <div className="grid grid-cols-3 gap-4">
        {['mentor', 'collaborator', 'guardian'].map((role) => (
          <button
            key={role}
            onClick={() => setAiRole(role)}
            className={`p-4 rounded-xl border transition-all ${
              aiRole === role
                ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500'
                : 'bg-black/30 border-gray-700'
            }`}
          >
            <div className="text-2xl mb-2">
              {role === 'mentor' && '🧙‍♂️'}
              {role === 'collaborator' && '👨‍💻'}
              {role === 'guardian' && '🛡️'}
            </div>
            <div className="font-medium capitalize">{role}</div>
            <div className="text-xs text-gray-400 mt-1">
              {role === 'mentor' && 'Kalauz & Tanító'}
              {role === 'collaborator' && 'Pair-programmer'}
              {role === 'guardian' && 'Lovag-Őrző'}
            </div>
          </button>
        ))}
      </div>

      {/* Emberi Szándék Bevitele */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={humanIntent}
            onChange={(e) => setHumanIntent(e.target.value)}
            placeholder="Írd ide a szándékodat... (pl.: 'Szeretnék egy etikus smart contract-et írni')"
            className="flex-1 p-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && submitIntent()}
          />
          <button
            onClick={submitIntent}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Küldés AI-nak
          </button>
        </div>
        
        <div className="text-sm text-gray-500 text-center">
          {aiRole === 'mentor' && 'A Mentor AI segít megérteni az etikai következményeket'}
          {aiRole === 'collaborator' && 'A Collaborator AI pair-programmerként dolgozik veled'}
          {aiRole === 'guardian' && 'A Guardian AI véd és regenerál'}
        </div>
      </div>

      {/* Beszélgetés Történet */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">🤝 Szimbiózis Beszélgetés</h3>
        {conversation.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🌀</div>
            <p>Kezdd el a párbeszédet az AI partnerrel</p>
            <p className="text-sm mt-2">Minden interakció építi a digitális tested</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.map((entry, idx) => (
              <div key={idx} className="space-y-3">
                {/* Emberi üzenet */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 rounded-xl rounded-tr-none border border-blue-500/30">
                    <p className="text-white">{entry.human}</p>
                    <div className="text-xs text-gray-400 mt-2 text-right">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                {/* AI válasz */}
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    {renderAIResponse(entry.ai)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filozófiai Megjegyzés */}
      <div className="p-4 bg-gradient-to-r from-gray-900/30 to-black/30 rounded-xl border border-gray-700">
        <p className="text-sm text-gray-400 italic text-center">
          "Ez a kapcsolat nem uralom vagy függőség, hanem kölcsönös kiterjesztés. 
          A GFLO_AI nem helyettesíti a kreativitásodat, hanem kibővíti a szándékod hatókörét."
        </p>
      </div>
    </div>
  );
}
