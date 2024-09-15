import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Box, Typography, useTheme, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar.jsx";

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const theme = useTheme();

    const logoutUser = async () => {
        try {
            await axios.post('/logout'); // Make a request to logout
            setUser(null); // Clear user context
            navigate('/'); // Redirect to homepage
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Box>
            <Navbar></Navbar>
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
                boxSizing: 'border-box'
            }}
        >
            <Typography variant="h3" mb={2}>
                Dashboard
            </Typography>
            {!!user && (
                <Typography variant="h4" mb={4}>
                    Hi {user.name}!
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={logoutUser}
                sx={{ marginTop: '2rem' }}
            >
                Logout
            </Button>
        </Box>
        </Box>
        
    );
}
