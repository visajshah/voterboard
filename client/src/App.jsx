// Main App component setting up routing and theme for the application
import { Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Navbar from "./components/Navbar";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// Define a light theme using Material-UI's createTheme
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    // Wrap the entire app with the light theme using ThemeProvider
    <ThemeProvider theme={lightTheme}>
      <div>
        {/* Set up routes using react-router-dom */}
        <Routes>
          {/* Route for Navbar component */}
          <Route path="/*" element={<Navbar />} />
        </Routes>
      </div>

      <div>
        <Routes>
          {/* Route for Home component */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
