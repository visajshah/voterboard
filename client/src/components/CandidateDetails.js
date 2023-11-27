// React component for managing candidate details, including a form to add a new candidate
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Stack } from '@mui/material';
import { useState } from 'react';

export default function CandidateDetails({ contract, web3, currentAccount }) {
  // State to manage candidate name input
  const [name, setName] = useState('');

  // Handle form submission to add a new candidate
  const handleForm = async (event) => {
    event.preventDefault();
    try {
      // Call the smart contract method to add a candidate
      await contract.methods.addCandidate(name).send({ from: currentAccount });
    } catch (error) {
      console.error(error);
    }
    // Clear the input field after submission
    setName('');
  };

  // Handle input change for candidate name
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Render the form for adding a new candidate
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        width: '40%',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleForm}
    >
      <Stack spacing={2}>
        {/* Input field for candidate name */}
        <TextField
          id="outlined-basic"
          label="Candiate Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        {/* Button to submit the form and add a new candidate */}
        <Button variant="contained" type="submit">
          Add Candidate
        </Button>
      </Stack>
    </Box>
  );
}
