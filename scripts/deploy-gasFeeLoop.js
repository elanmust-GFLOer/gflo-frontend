const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy GasFeeLoop with the deployer as treasury and registry placeholders.
  // For real deployment, replace these addresses with proper treasury/registy addresses.
  const GasFeeLoop = await hre.ethers.getContractFactory("GasFeeLoop");
  const gasFeeLoop = await GasFeeLoop.deploy(deployer.address, deployer.address);
  await gasFeeLoop.deployed();

  console.log("GasFeeLoop deployed to:", gasFeeLoop.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
