import { useState } from 'react';

export default function ElanMustAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hogy minden reggel egy új nap kezdődik. Mit jelent számodra az "örök visszatérés"?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Call Flask API
      const res = await fetch('https://web-gflo-sov-f4a65.up.railway.app/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await res.json();
      
      // Add AI response
      const aiMsg = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI error:', err);
      const errorMsg = { role: 'assistant', content: 'Hiba történt az AI válasz során.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-2xl mb-4">🌳 ElanMust.AI - GFLO Flowkeeper</h1>
      
      {/* Chat messages */}
      <div className="space-y-4 mb-4 h-[70vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'text-cyan-400' : 'text-green-400'}>
              {msg.role === 'user' ? 'Te: ' : 'AI: '}
            </span>
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-yellow-400">AI gondolkodik...</div>}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Írd ide a választ..."
          className="flex-1 bg-gray-900 text-green-400 p-2 border border-green-700 rounded"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-green-700 hover:bg-green-600 text-black px-6 py-2 rounded font-bold"
        >
          KÜLDÉS
        </button>
      </div>
    </div>
  );
}
