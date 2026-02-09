import React from 'react'

export function GFLOPhilosophy() {
  const philosophy = {
    sovereign: {
      title: "👑 Sovereign Logic",
      description: "You are not a subject, but an active shaper of your digital path.",
      color: "from-blue-500/20 to-blue-700/20",
      border: "border-blue-500/30"
    },
    ai: {
      title: "🤖 AI Guardian",
      description: "AI as the conscience of the system, not just a tool.",
      color: "from-purple-500/20 to-purple-700/20",
      border: "border-purple-500/30"
    },
    ethics: {
      title: "⚖️ Ethics-Driven",
      description: "Growth based on real value, not manipulation.",
      color: "from-green-500/20 to-green-700/20",
      border: "border-green-500/30"
    }
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {Object.values(philosophy).map((item, index) => (
        <div 
          key={index}
          className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border}`}
        >
          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
          <p className="text-gray-300">{item.description}</p>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-400">
              {index === 0 && "Implemented via UserPathRegistry"}
              {index === 1 && "Implemented via AI Oracle & Axioms"}
              {index === 2 && "Implemented via XP Fraud Detector"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
