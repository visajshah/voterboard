// React component for the admin dashboard, including election management and candidate/voter forms
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';

import CandidateDetails from '../components/CandidateDetails';
import VotersForm from '../components/VotersForm';

export default function Admin({ role, contract, web3, currentAccount }) {
  // State to manage election state, loading status, and candidate details
  const [electionState, setElectionState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  // State for the confirmation dialog
  const [open, setOpen] = useState(false);

  // Function to fetch and update candidate details from the smart contract
  const getCandidates = async () => {
    if (contract) {
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ name: candidate[0], votes: candidate[1] });
      }
      setCandidates(temp);
      setLoading(false);
    }
  };

  // Function to fetch and update the election state from the smart contract
  const getElectionState = async () => {
    if (contract) {
      const state = await contract.methods.electionState().call();
      setElectionState(parseInt(state));
    }
  };

  // UseEffect to fetch initial data on component mount and whenever the contract is updated
  useEffect(() => {
    getElectionState();
    getCandidates();
  }, [contract]);

  // Handlers for the confirmation dialog
  const handleEnd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    if (electionState === 0) {
      try {
        if (contract) {
          await contract.methods.startElection().send({ from: currentAccount });
          getElectionState();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else if (electionState === 1) {
      try {
        if (contract) {
          await contract.methods.endElection().send({ from: currentAccount });
          getElectionState();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setOpen(false);
  };

  // Render the admin dashboard based on the election state
  return (
    <Box>
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
          <Grid container sx={{ mt: 0 }} spacing={4}>
            <Grid item xs={12}>
              {/* Display the heading based on the election state */}
              <h1 align="center" variant="h6">
                {electionState === 0 && 'New voter/candidate form'}
                {electionState === 1 && 'Election Tracking'}
                {electionState === 2 && 'Final Results'}
              </h1>
            </Grid>

            {electionState === 0 && (
              <Grid
                item
                xs={12}
                sx={{
                  overflowY: 'hidden',
                  overflowX: 'auto',
                  display: 'flex',
                  width: '98vw',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Render the voter and candidate forms */}
                  <VotersForm
                    contract={contract}
                    web3={web3}
                    currentAccount={currentAccount}
                  />
                  <CandidateDetails
                    contract={contract}
                    web3={web3}
                    currentAccount={currentAccount}
                  />
                </Box>
              </Grid>
            )}

            {electionState > 0 && (
              <Grid
                item
                xs={12}
                sx={{
                  overflowY: 'hidden',
                  overflowX: 'auto',
                  display: 'flex',
                  width: '98vw',
                  justifyContent: 'center',
                }}
              >
                {/* Render the table for displaying candidate details */}
                <TableContainer component={Paper} style={{ width: 1000 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Index</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Name</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Votes</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {candidates &&
                        candidates.map((candidate, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{candidate.name}</TableCell>
                            <TableCell>{candidate.votes}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            {/* Render the button to start or end the election based on the state */}
            {electionState !== 2 && (
              <Grid item xs={12} sx={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  sx={{ width: '40%', margin: 'auto' }}
                  onClick={handleEnd}
                >
                  {electionState === 0 && 'Start Election'}
                  {electionState === 1 && 'End Election'}
                </Button>
              </Grid>
            )}
          </Grid>

          {/* Render the confirmation dialog for starting or ending the election */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {electionState === 0 && 'Do you want to start the election?'}
                {electionState === 1 && 'Do you want to end the election?'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAgree} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}
