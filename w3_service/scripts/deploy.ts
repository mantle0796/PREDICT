const { hre, ethers } = require("hardhat");


async function main() {
  const provider = new ethers.providers.JsonRpcProvider('https://aia-dataseed1-testnet.aiachain.org');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const balance = await wallet.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance)}  QF`);
  // Compile and deploy the contract

  const QuestToken = await ethers.getContractFactory("Pred");
  const myCustomToken = await QuestToken.deploy();
  await myCustomToken.deployed();

  console.log(
    "MyCustomToken deployed to:===========",
    "myCustomToken",
    myCustomToken.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
