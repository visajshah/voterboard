// React component for managing voter details, including a form to add a new voter
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Stack } from "@mui/material";
import { useState } from "react";

export default function VotersForm({ contract, web3, currentAccount }) {
  // State to manage voter address input
  const [name, setName] = useState("");

  // Handle form submission to add a new voter
  const handleForm = async (event) => {
    event.preventDefault();
    try {
      // Call the smart contract method to add a voter
      await contract.methods.addVoter(name).send({ from: currentAccount });
      console.log("voter added");
    } catch (error) {
      console.log(error);
    }
    // Clear the input field after submission
    setName("");
  };

  // Handle input change for voter address
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Render the form for adding a new voter
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "40%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleForm}
    >
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Voters Address"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <Button variant="contained" type="submit">
          Add Voter
        </Button>
      </Stack>
    </Box>
  );
}
