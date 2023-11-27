// React component for the application navbar
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  // Render the application navbar
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Application title with styling */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'Helvetica',
              fontWeight: 700,
              color: 'inherit',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Voterboard
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
