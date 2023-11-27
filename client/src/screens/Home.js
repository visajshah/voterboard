// React component for the Home page, determining user role and rendering corresponding components
import Admin from './Admin';
import Box from '@mui/material/Box';
import ElectionContract from '../contracts/Election.json';
import getWeb3 from '../utils/getWeb3';
import Vote from './Vote';

import { useEffect, useState } from 'react';

export default function Home() {
  // State to manage user role, web3 instance, current account, smart contract, and loading status
  const [role, setRole] = useState(2);
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to load web3 and initialize smart contract instance
  const loadWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setCurrentAccount(accounts[0]);
      setContract(instance);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to get and set the user role from the smart contract
  const getRole = async () => {
    if (contract) {
      const user = await contract.methods.getRole(currentAccount).call();
      setRole(parseInt(user));
      setLoading(false);
    }
  };

  // UseEffect to load web3 on component mount
  useEffect(() => {
    loadWeb3();
  }, []);

  // UseEffect to get and set the user role whenever the contract is updated
  useEffect(() => {
    getRole();
  }, [contract]);

  // Render different components based on the user role
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        height: '100vh',
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          Loading...
        </Box>
      ) : (
        <Box>
          {role === 1 && (
            <Admin
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 2 && (
            <Vote
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 3 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
              }}
            >
              Unauthorized User
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
