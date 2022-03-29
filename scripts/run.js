const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "ipfs://QmcS6JSSDZeuYKa9LgqbasC4LpyvL8JEdFDoTXMJofH9RJ/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("Vasecollection");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy(baseTokenURI);

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    let txn = await contract.reserveNFTs();
    await txn.wait();
    console.log("1 NFT have been reserved");

    // Mint 1 NFTs by sending 0.03 ether
    txn = await contract.mintNFTs(2, { value: utils.parseEther('0.001') });
    await txn.wait()

    // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });