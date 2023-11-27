// Utility function to get a Web3 instance, enabling Ethereum provider if available
import Web3 from 'web3';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      // If MetaMask or similar provider is available, use it
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
        // If legacy web3 is available, use it
      } else if (window.web3) {
        const web3 = window.web3;
        resolve(web3);
      }
      // Fallback to a local development provider if no other provider is available
      else {
        const provider = new Web3.providers.HttpProvider(
          'http://127.0.0.1:7545'
        );
        const web3 = new Web3(provider);
        resolve(web3);
      }
    });
  });

export default getWeb3;
