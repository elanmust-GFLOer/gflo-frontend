const hre = require("hardhat");

async function main() {
  console.log("🚀 GFLO Contract Deployment Starting...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // 1. Deploy GFLOToken (Mock)
  console.log("\n1. Deploying GFLOToken...");
  const GFLOToken = await hre.ethers.getContractFactory("GFLOToken");
  const gfloToken = await GFLOToken.deploy();
  await gfloToken.deployed();
  console.log("✅ GFLOToken deployed to:", gfloToken.address);

  // 2. Deploy UserPathRegistry
  console.log("\n2. Deploying UserPathRegistry...");
  const UserPathRegistry = await hre.ethers.getContractFactory("UserPathRegistry");
  const userPathRegistry = await UserPathRegistry.deploy();
  await userPathRegistry.deployed();
  console.log("✅ UserPathRegistry deployed to:", userPathRegistry.address);

  // 3. Deploy SovereignModule
  console.log("\n3. Deploying SovereignModule...");
  const SovereignModule = await hre.ethers.getContractFactory("SovereignModule");
  const sovereignModule = await SovereignModule.deploy(userPathRegistry.address);
  await sovereignModule.deployed();
  console.log("✅ SovereignModule deployed to:", sovereignModule.address);

  // 4. Deploy PraxisModule
  console.log("\n4. Deploying PraxisModule...");
  const PraxisModule = await hre.ethers.getContractFactory("PraxisModule");
  const praxisModule = await PraxisModule.deploy(userPathRegistry.address);
  await praxisModule.deployed();
  console.log("✅ PraxisModule deployed to:", praxisModule.address);

  // 5. Deploy ReformerModule
  console.log("\n5. Deploying ReformerModule...");
  const ReformerModule = await hre.ethers.getContractFactory("ReformerModule");
  const reformerModule = await ReformerModule.deploy(userPathRegistry.address);
  await reformerModule.deployed();
  console.log("✅ ReformerModule deployed to:", reformerModule.address);

  // 6. Deploy MetadataValidator
  console.log("\n6. Deploying MetadataValidator...");
  const MetadataValidator = await hre.ethers.getContractFactory("MetadataValidator");
  const metadataValidator = await MetadataValidator.deploy();
  await metadataValidator.deployed();
  console.log("✅ MetadataValidator deployed to:", metadataValidator.address);

  // Save addresses to file
  const addresses = {
    GFLOToken: gfloToken.address,
    UserPathRegistry: userPathRegistry.address,
    SovereignModule: sovereignModule.address,
    PraxisModule: praxisModule.address,
    ReformerModule: reformerModule.address,
    MetadataValidator: metadataValidator.address,
    network: hre.network.name,
    timestamp: new Date().toISOString()
  };

  const fs = require('fs');
  fs.writeFileSync(
    `deployed-addresses-${hre.network.name}.json`,
    JSON.stringify(addresses, null, 2)
  );

  console.log("\n🎉 All contracts deployed successfully!");
  console.log("📄 Addresses saved to: deployed-addresses-" + hre.network.name + ".json");
  
  // Verify on BaseScan (ha van API kulcs)
  if (hre.network.name === "baseSepolia" || hre.network.name === "base") {
    console.log("\n🔍 Verifying contracts on BaseScan...");
    await verifyContract(gfloToken.address, []);
    await verifyContract(userPathRegistry.address, []);
    await verifyContract(sovereignModule.address, [userPathRegistry.address]);
    await verifyContract(praxisModule.address, [userPathRegistry.address]);
    await verifyContract(reformerModule.address, [userPathRegistry.address]);
    await verifyContract(metadataValidator.address, []);
  }
}

async function verifyContract(address, args) {
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
    console.log(`✅ Verified: ${address}`);
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log(`⚠️ Already verified: ${address}`);
    } else {
      console.log(`❌ Verification failed for ${address}:`, error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
