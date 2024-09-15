import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post('/register', {
        name, email, password
      });
      const { data } = response;
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Registration Successful.');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.main.beige,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 1000
        }}
      >
        Back
      </Button>
      <Box 
        marginTop={-15}
        component="form"
        onSubmit={registerUser}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
        
        <Typography variant="h3" mb={1} fontWeight={"bold"}>
          Register
        </Typography>
        <Typography variant="h4" mb={5}>
          Create an account to get started.
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          type="text"
          placeholder="Enter name..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
