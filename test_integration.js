const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 GFLO Integration Tests");
  
  // 1. Connect to network
  const [deployer, user1] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("User1:", user1.address);
  
  // 2. Get contract instances
  const GFLOToken = await ethers.getContractFactory("GFLOToken");
  const gfloToken = await GFLOToken.attach("");
  
  const UserPathRegistry = await ethers.getContractFactory("UserPathRegistry");
  const registry = await UserPathRegistry.attach("");
  
  // 3. Test token transfer
  console.log("\n1. Testing token transfer...");
  const transferTx = await gfloToken.transfer(user1.address, ethers.utils.parseEther("100"));
  await transferTx.wait();
  console.log("✅ Token transfer successful");
  
  // 4. Test user path creation
  console.log("\n2. Testing user path creation...");
  const createTx = await registry.createUserPath(
    "Test Path",
    JSON.stringify({ created: new Date().toISOString() })
  );
  await createTx.wait();
  console.log("✅ User path created");
  
  // 5. Get user paths
  console.log("\n3. Fetching user paths...");
  const paths = await registry.getUserPaths(deployer.address);
  console.log("User paths:", paths);
  
  console.log("\n🎉 All integration tests passed!");
}

main().catch(console.error);
