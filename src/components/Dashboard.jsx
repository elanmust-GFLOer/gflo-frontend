import React, { useState } from 'react'
import { useAccount, useConnect, useReadContract } from 'wagmi'
import { GFLO_CONTRACTS, GFLO_ABIS } from '../lib/web3/gflo-web3-config'
import { useCanonicalIdentity } from '../hooks/useCanonicalIdentity'

export function Dashboard() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, error: connectError } = useConnect()
  const [debug, setDebug] = useState('')

  const handleConnect = () => {
    setDebug('Connectors: ' + connectors.length)
    if (connectors.length > 0) {
      connect({ connector: connectors[0] })
    } else {
      setDebug('Nincs connector! Telepítsd a MetaMask-ot.')
    }
  }

  // Reputation comes only from the backend's canonical, fail-closed read path.
  // The retired v3 PIECore (self-mintable XP) is never read.
  const rep = useCanonicalIdentity()

  const tokenAddress = GFLO_CONTRACTS.token
  const { data: balanceRaw } = useReadContract({
    address: tokenAddress ?? undefined,
    abi: GFLO_ABIS.token,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address && !!tokenAddress }
  })

  const balance = balanceRaw ? Number(balanceRaw) / 1e18 : 0
  const repOk = rep.status === 'ok' && rep.identity.exists
  const repSub = { loading: 'loading…', unavailable: 'not live yet', error: 'backend error', ok: 'no identity' }[rep.status]

  if (!isConnected) return (
    <div style={{minHeight:'100vh',background:'#0a0a0f',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',padding:'2rem',border:'1px solid #2563eb44',borderRadius:'1rem',background:'#ffffff08',maxWidth:'320px'}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🦾</div>
        <h1 style={{color:'white',fontSize:'1.8rem',fontWeight:'bold',marginBottom:'0.5rem'}}>GFLO Sovereign</h1>
        <p style={{color:'#9ca3af',marginBottom:'0.5rem'}}>Sovereign AI-Web3 Ecosystem</p>
        <p style={{color:'#6b7280',fontSize:'0.75rem',marginBottom:'1.5rem'}}>
          Connectors: {connectors.length} | {connectors.map(c => c.name).join(', ') || 'nincs'}
        </p>
        <button onClick={handleConnect}
          style={{padding:'0.75rem 2rem',background:'linear-gradient(135deg,#2563eb,#7c3aed)',color:'white',border:'none',borderRadius:'0.75rem',fontSize:'1rem',fontWeight:'600',cursor:'pointer',width:'100%'}}>
          Connect Wallet
        </button>
        {debug && <p style={{color:'#f59e0b',marginTop:'0.5rem',fontSize:'0.8rem'}}>{debug}</p>}
        {connectError && <p style={{color:'#ef4444',marginTop:'0.5rem',fontSize:'0.8rem'}}>{connectError.message}</p>}
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0f',color:'white',padding:'1.5rem',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
          <h1 style={{fontSize:'1.8rem',fontWeight:'bold',background:'linear-gradient(90deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>
            🦾 GFLO Sovereign
          </h1>
          <div style={{padding:'0.5rem 1rem',background:'#ffffff0a',borderRadius:'2rem',border:'1px solid #ffffff15',fontSize:'0.8rem',color:'#9ca3af'}}>
            ● {address?.slice(0,6)}...{address?.slice(-4)}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'1.5rem'}}>
          {[
            {label:'XP',value:repOk ? Number(rep.identity.xp).toLocaleString() : '—',color:'#60a5fa',icon:'🧬',sub:repOk ? 'verified merit' : repSub},
            {label:'Tier',value:repOk ? `Tier ${rep.identity.effectiveTier}` : '—',color:'#a78bfa',icon:'👑',sub:repOk ? (rep.identity.path || '—') : repSub},
            {label:'GFLO',value:tokenAddress ? balance.toFixed(2) : '—',color:'#34d399',icon:'🪙',sub:tokenAddress ? 'balance' : 'token not deployed'},
          ].map(c => (
            <div key={c.label} style={{padding:'1.25rem',borderRadius:'1rem',background:'#ffffff06',border:`1px solid ${c.color}22`}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.5rem'}}>
                <span style={{fontWeight:'600',fontSize:'0.9rem'}}>{c.label}</span>
                <span>{c.icon}</span>
              </div>
              <div style={{fontSize:'1.5rem',fontWeight:'bold',color:c.color}}>{c.value}</div>
              <div style={{fontSize:'0.75rem',color:'#6b7280',marginTop:'0.25rem'}}>{c.sub}</div>
            </div>
          ))}
        </div>

        {rep.status === 'unavailable' && (
          <div role="status" style={{padding:'1rem',borderRadius:'0.75rem',background:'#f59e0b11',border:'1px solid #f59e0b44',color:'#fcd34d',fontSize:'0.85rem',marginBottom:'1.5rem'}}>
            Verified reputation is not live yet. The old Sepolia v3 XP could be self-minted by anyone, so it is no longer shown.
          </div>
        )}

        <div style={{textAlign:'center',color:'#4b5563',fontSize:'0.8rem',fontStyle:'italic',paddingTop:'1rem',borderTop:'1px solid #ffffff08'}}>
          "Become who you are." – Nietzsche
        </div>
      </div>
    </div>
  )
}
