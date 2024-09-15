import React from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{ backgroundColor: theme.palette.main.pink }} 
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h2" sx={{ fontWeight: 900 }} color={theme.palette.main.beige}>
        WELCOME TO
      </Typography>
      
      <Typography variant="h1" color={theme.palette.main.beige} sx={{ WebkitTextStroke: "2.5px black" }} padding="20px">
        SonnyStash
      </Typography>
      
      <Typography variant="h3" color={theme.palette.main.beige} sx={{ fontWeight: 700 }}>
        YOUR ULTIMATE DESTINATION FOR <span style={{ color: '#000' }}>SONNY ANGEL</span> COLLECTIONS!
      </Typography>

      <Box display="flex" flexDirection="column" padding="40px">
        <Button
          sx={{ backgroundColor: theme.palette.main.black, color: theme.palette.main.beige, mb: 2, borderRadius: '50px', width: '100px' }}
          variant="contained" onClick={() => navigate('/login')}
        >
          LOGIN
        </Button>
        <Button
          sx={{ backgroundColor: theme.palette.main.black, color: theme.palette.main.beige, mb: 2, borderRadius: '50px', width: '100px' }}
          variant="contained"  onClick={() => navigate('/register')}
        >
          SIGNUP
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
