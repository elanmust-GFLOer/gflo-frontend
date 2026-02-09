#!/bin/bash
echo "🌌 GFLO Sovereign Ecosystem Startup"
echo "======================================"

# 1. Start Backend
echo "1. Starting Backend API..."
cd ~/gflo-clean/backend
python app.py &
BACKEND_PID=$!
sleep 3
echo "   ✅ Backend running (PID: $BACKEND_PID)"

# 2. Start Frontend
echo "2. Starting Frontend..."
cd ~/gflo-frontend
npm run dev &
FRONTEND_PID=$!
sleep 5
echo "   ✅ Frontend running (PID: $FRONTEND_PID)"

# 3. Show URLs
echo ""
echo "🌐 ACCESS POINTS:"
echo "   Frontend:    http://localhost:5173"
echo "   Backend API: http://localhost:5000"
echo "   AI Oracle:   http://localhost:5000/ai"
echo ""
echo "📡 SMART CONTRACTS:"
echo "   Network:     Base Sepolia"
echo "   Explorer:    https://sepolia.basescan.org"
echo ""
echo "🛑 To stop everything: kill $BACKEND_PID $FRONTEND_PID"

# Wait for user interrupt
echo ""
echo "Press Ctrl+C to stop all services"
wait
