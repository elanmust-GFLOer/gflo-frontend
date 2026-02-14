// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IGasFeeLoop {
    function distributeGFLO(address[] calldata detectors) external;
    function syncXP(address user, uint256 amount) external;
    function getReputation(address user) external view returns (uint256);
}
