#!/bin/bash
echo "--- GFLO Sovereign: Teljes Rendszer-Újraindítás ---"

# 1. A sérült részek eltávolítása (A tisztítótűz)
echo "Sérült szinapszisok eltávolítása..."
rm -rf node_modules package-lock.json
npx hardhat clean

# 2. Újraépítés az alapoktól (Kifejezetten a Node 25-höz igazítva)
echo "Idegszálak újrafűzése (ez eltarthat 1-2 percig)..."
npm install --save-dev \
  hardhat \
  @nomicfoundation/hardhat-toolbox \
  @nomicfoundation/hardhat-chai-matchers \
  --legacy-peer-deps --force

# 3. A struktúra megerősítése
mkdir -p contracts/interfaces contracts/registry

# 4. Fordítás indítása
echo "A Reformer beindítása..."
npx hardhat --config hardhat.config.cjs compile
