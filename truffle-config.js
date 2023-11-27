const path = require('path');
require('dotenv').config(); 
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { INFURA_ENDPOINT, MNEMONIC } = process.env;

module.exports = {

  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_ENDPOINT),
      network_id: '11155111',
    },
  },

  compilers: {
    solc: {
      version: '0.8.14', // Fetch exact version from solc-bin (default: truffle's version)
    },
  },

};
