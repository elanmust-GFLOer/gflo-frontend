const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const treasury = process.env.TREASURY_ADDRESS || process.argv[2] || deployer.address;
  const registry = process.env.REGISTRY_ADDRESS || process.argv[3] || deployer.address;

  console.log(`Using treasury: ${treasury}`);
  console.log(`Using registry: ${registry}`);

  // Deploy GasFeeLoop
  const GasFeeLoop = await hre.ethers.getContractFactory("GasFeeLoop");
  const gasFeeLoop = await GasFeeLoop.deploy(treasury, registry);
  await gasFeeLoop.deployed();

  console.log("GasFeeLoop deployed to:", gasFeeLoop.address);

  // Ensure deployments folder
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) fs.mkdirSync(deploymentsDir);

  const out = {
    name: 'GasFeeLoop',
    address: gasFeeLoop.address,
    deployer: deployer.address,
    treasury,
    registry,
    network: hre.network.name,
    txHash: gasFeeLoop.deployTransaction.hash,
    timestamp: new Date().toISOString()
  };

  const outPath = path.join(deploymentsDir, `gasFeeLoop-${hre.network.name}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`Wrote deployment info to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
