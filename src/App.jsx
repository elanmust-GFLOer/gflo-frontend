import { useState, useEffect } from 'react';
import './App.css';

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
    fetch('/nft_metadata.json')
      .then(res => res.json())
      .then(data => setMetadata(data));
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>GFLOer irányítópult 🌐</h1>
        <div className="status-badge">Hálózat: Sepolia L2</div>
        <div className="status-badge">AI Core: {aiStatus}</div>
      </header>

      <main>
        {metadata ? (
          <div className="nft-card">
            <div className="card-image-placeholder">🎨 Teremtés könyve #1</div>
            <h2>{metadata.name}</h2>
            <p className="description">{metadata.description}</p>
            <div className="traits">
               <p>Rang: {metadata.attributes[0].value}</p>
               <p>Márka: {metadata.attributes[1].value}</p>
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
