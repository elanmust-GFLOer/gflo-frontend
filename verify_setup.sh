#!/bin/bash
echo -e "\033[0;36m--- GFLO Sovereign: Utolsó Szinapszis Bekötése ---\033[0m"

# 1. Konfigurációs fájl ellenőrzése (HHE3 fix)
if [ ! -f "hardhat.config.cjs" ]; then
    echo "Hiba: hardhat.config.cjs nem található. Helyreállítás..."
    echo "module.exports = { solidity: '0.8.28' };" > hardhat.config.cjs
fi

# 2. A hiányzó "Chai" és a többi szinapszis kényszerítése
echo "Chai és alapmodulok infúziója..."
npm install --save-dev \
  hardhat \
  @nomicfoundation/hardhat-toolbox \
  @nomicfoundation/hardhat-chai-matchers \
  chai@4 \
  --legacy-peer-deps --force

# 3. Fordítás indítása
echo "A Reformer beindítása..."
npx hardhat --config hardhat.config.cjs compile
