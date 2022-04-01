const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // URL from where we can extract the metadata for a LW3Punks
  const metadataURL = "ipfs://QmU2mcd6tfaP19ewmM5QwBbUwCggrzpaho4eXiEzXAag2T/";
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  const vaseCollectionContract = await ethers.getContractFactory("VaseCollection");

  // deploy the contract
  const deployedVaseCollectionContract = await vaseCollectionContract.deploy(metadataURL);

  await deployedVaseCollectionContract.deployed();

  // print the address of the deployed contract
  console.log("VaseCollection Contract Address:", deployedVaseCollectionContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });