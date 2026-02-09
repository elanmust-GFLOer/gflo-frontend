import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [aiStatus, setAiStatus] = useState("Kapcsolódás...");

  useEffect(() => {
    //f74f3ed7b8dc11c1-188-190-101-7.serveousercontent.com
           fetch('https://f74f3ed7b8dc11c1-188-190-101-7.serveousercontent.com/stats')
      .then(res => res.json())
      .then(data => setAiStatus(data.status))
      .catch(() => setAiStatus("Offline 🛑"));
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>GFLOer Dashboard 🌐</h1>
        <div className="status-badge">AI Core: {aiStatus}</div>
      </header>
      <main>
        <p>A rendszer online, az adatok betöltése folyamatban...</p>
      </main>
    </div>
  );
}

export default App; 
