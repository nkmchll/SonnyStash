import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/login', {
        email,
        password
      });
      const { data } = response;
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed, please try again.');
    }
  };

  return (
    <Box
      sx={{ backgroundColor: theme.palette.main.beige}} 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
      
    >
      <Box marginTop={-15}>
        <Typography variant="h3" mb={1} fontWeight={"bold"}>
          Login
        </Typography>
        <Typography variant="h4" mb={5}>
          Sign in to continue.
        </Typography>
      </Box>
      
      <form onSubmit={loginUser} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          placeholder="Enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
