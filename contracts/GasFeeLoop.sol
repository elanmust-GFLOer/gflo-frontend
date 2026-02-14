// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IGasFeeLoop.sol";

contract GasFeeLoop is ERC20, IGasFeeLoop {
    address public detectorRegistry;
    address public treasuryWallet;
    mapping(address => uint256) public userReputation;

    constructor(address _treasury, address _registry) ERC20("GFLO Token", "GFLO") {
        treasuryWallet = _treasury;
        detectorRegistry = _registry;
    }

    /**
     * @dev Az Atomic Reactor szíve: 40% égetés, 30% kincstár, 30% validátor jutalom.
     */
    function distributeGFLO(address[] calldata detectors) external override {
        require(msg.sender == detectorRegistry, "Only Registry can trigger");
        
        uint256 totalTax = balanceOf(address(this)); 
        if (totalTax == 0) return;

        // 1. 40% BURN (Fire Element)
        uint256 burnAmount = (totalTax * 40) / 100;
        _burn(address(this), burnAmount);

        // 2. 30% TREASURY (Water Element)
        uint256 treasuryAmount = (totalTax * 30) / 100;
        _transfer(address(this), treasuryWallet, treasuryAmount);

        // 3. 30% FISSION POOL (Air Element - Rewards)
        uint256 rewardPerDetector = (totalTax * 30) / 100 / detectors.length;
        
        unchecked {
            for (uint256 i = 0; i < detectors.length; i++) {
                _transfer(address(this), detectors[i], rewardPerDetector);
                userReputation[detectors[i]] += 10; 
            }
        }
    }

    function syncXP(address user, uint256 amount) external override {
        // XP Ledger logika helye
    }

    function getReputation(address user) external view override returns (uint256) {
        return userReputation[user];
    }
}
