// React component for voting, allowing users to select and vote for candidates
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { useEffect, useState } from 'react';

import Candidate from '../components/Candidate';

export default function Vote({ role, contract, web3, currentAccount }) {
  // State to manage candidate details, selected vote, and election state
  const [candidates, setCandidates] = useState([]);
  const [vote, setVote] = useState(null);
  const [electionState, setElectionState] = useState(0);

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
    }
  };

  // Function to vote for a selected candidate
  const voteCandidate = async (candidate) => {
    try {
      if (contract) {
        await contract.methods.vote(candidate).send({ from: currentAccount });
        getCandidates();
      }
    } catch (error) {
      console.error('Error:', error);
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

  // Event handler for changing the selected vote
  const handleVoteChange = (event) => {
    setVote(event.target.value);
  };

  // Event handler for submitting the vote
  const handleVote = (event) => {
    event.preventDefault();
    voteCandidate(vote);
  };

  // Render the voting component based on the election state
  return (
    <Box>
      <form onSubmit={handleVote}>
        <Grid container sx={{ mt: 0 }} spacing={6} justifyContent="center">
          <Grid item xs={12}>
            {/* Display heading based on the election state */}
            <h1 align="center" variant="h6">
              {electionState === 0 &&
                'Please Wait... Election has not started yet.'}
              {electionState === 1 && 'Vote Here!'}
              {electionState === 2 && 'Election has ended'}
            </h1>
          </Grid>
          {electionState === 1 && (
            <>
              <Grid item xs={12}>
                {/* Form control for selecting a candidate to vote */}
                <FormControl>
                  <RadioGroup
                    row
                    sx={{
                      overflowY: 'hidden',
                      overflowX: 'auto',
                      display: 'flex',
                      width: '98vw',
                      justifyContent: 'center',
                    }}
                    value={vote}
                    onChange={handleVoteChange}
                  >
                    {candidates.map((candidate, index) => (
                      <FormControlLabel
                        key={index}
                        labelPlacement="top"
                        control={<Radio />}
                        value={index}
                        label={<Candidate id={index} name={candidate.name} />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <div style={{ margin: 20 }}>
                  {/* Button to submit the vote */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%' }}
                  >
                    Vote
                  </Button>
                </div>
              </Grid>
            </>
          )}

          {electionState === 2 && (
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
              {/* Displaying candidate details after the election has ended */}
              {candidates &&
                candidates.map((candidate, index) => (
                  <Box sx={{ mx: 2 }} key={index}>
                    <Candidate
                      id={index}
                      name={candidate.name}
                      voteCount={candidate.votes}
                    />
                  </Box>
                ))}
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
}
