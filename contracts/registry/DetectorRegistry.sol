// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IGasFeeLoop {
    // A 40/30/30-as ciklus indítása a validátorok jutalmazására
    function distributeGFLO(address[] calldata detectors) external;
    
    // XP frissítés a hírnév és a szintlépés (Tier 0-5) érdekében
    function syncXP(address user, uint256 amount) external;

    // Lekérdezés a hírnév alapú szelekcióhoz
    function getReputation(address user) external view returns (uint256);
}
