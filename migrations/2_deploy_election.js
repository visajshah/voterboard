const Election = artifacts.require("Election");

module.exports = async function (deployer) {
  try {
    // Deploy the Donations contract

    await deployer.deploy(Election);

    // Get the deployed instance

    const electionsInstance = await Election.deployed();

    console.log('Elections contract deployed at:', electionsInstance.address);
  } catch (error) {
    console.error('Error deploying the contract:', error);
  }
};
