import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [metadata, setMetadata] = useState(null);
  const [aiStatus, setAiStatus] = useState("Kapcsolódás...");

  useEffect(() => {
    fetch('https://5c034e2db57c1a24-188-190-101-7.serveousercontent.com/stats')
      .then(res => res.json())
      .then(data => setAiStatus(data.status))
      .catch(() => setAiStatus("Offline"));
  }, []);

  useEffect(() => {
    // Beolvassuk a metadata fájlt, amit az előbb másoltál be
    fetch('/nft_metadata.json')
      .then(res => res.json())
      .then(data => setMetadata(data));
  }, []);

    return (
    <div className="dashboard">
      <header>
        <h1>GFLOer Dashboard 🌐</h1>
        <div className="status-badge">Network: Sepolia L2</div>
        <div className="status-badge">AI Core: {aiStatus}</div>
      </header>

      <main>
        {metadata ? (
          <div className="nft-card">
            <div className="card-image-placeholder">🎨 Genesis #1</div>
            <h2>{metadata.name}</h2>
            <p className="description">{metadata.description}</p>
            
            <div className="traits">
              {metadata.attributes.map((attr, i) => (
                <div key={i} className="trait">
                  <span className="label">{attr.trait_type}:</span>
                  <span className="value">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Adatok betöltése...</p>
        )}
      </main>

      <footer>
        <button className="connect-btn">Connect Wallet (Wagmi)</button>
      </footer>
    </div>
  );
}

export default App;
