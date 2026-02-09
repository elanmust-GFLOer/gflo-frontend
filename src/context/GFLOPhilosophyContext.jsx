import React, { createContext, useContext } from 'react';

// GFLO Filozófiai Alapelvek
const GFLO_PHILOSOPHY = {
  sovereignLogic: {
    principle: "A felhasználó nem alany, hanem aktív alakító",
    implementation: "UserPathRegistry - saját digitális útvonalak",
    quote: "A szuverenitás nem ajándék, hanem felelősség."
  },
  aiGuardian: {
    principle: "AI mint lelkiismeret, nem eszköz",
    implementation: "Oracle mint etikai iránytű",
    quote: "A technológia az emberiség szolgálatában."
  },
  ethicsDriven: {
    principle: "Valós érték-alapú fejlődés",
    implementation: "XP Fraud Detector + Axioms rendszer",
    quote: "Minden döntés nyomon követhető legyen."
  }
};

const GFLOPhilosophyContext = createContext();

export function GFLOPhilosophyProvider({ children }) {
  return (
    <GFLOPhilosophyContext.Provider value={GFLO_PHILOSOPHY}>
      {children}
    </GFLOPhilosophyContext.Provider>
  );
}

export function useGFLOPhilosophy() {
  const context = useContext(GFLOPhilosophyContext);
  if (!context) {
    throw new Error('useGFLOPhilosophy must be used within GFLOPhilosophyProvider');
  }
  return context;
}
