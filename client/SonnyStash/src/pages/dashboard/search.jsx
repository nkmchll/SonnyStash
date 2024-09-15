import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Box, Typography, useTheme, Button } from '@mui/material';
import Navbar from "./navbar.jsx";

export default function Search() {
    const theme = useTheme();
    const { user, setUser } = useContext(UserContext);

    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                    backgroundColor: theme.palette.main.beige,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    padding: '2rem',
                    boxSizing: 'border-box'
                }}
            >
                <Box sx={{ maxWidth: '800px', textAlign: 'center', marginTop: '5rem'}} >
                    <Typography variant="h2" fontWeight={"bold"} fontSize={25} sx={{marginBottom: '1.5rem' }}>
                        Search for Your Favorite Sonny Angel
                    </Typography>
                    <Typography variant="body1" fontSize={16.5} >
                        Here, you can easily find and explore Sonny Angels from various collections and series.                
                    </Typography>
                    <Typography variant="body1" fontSize={16.5} mb={2}>
                        Whether you're looking for a specific figurine or browsing through different collections, 
                        our search feature helps you locate exactly what you need.                
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
