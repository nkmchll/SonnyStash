import { Box, Typography, useTheme, Button } from '@mui/material';
import Navbar from "./navbar.jsx";

export default function Wishlist() {
    const theme = useTheme();

    return (
        <Box>
            <Navbar />
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
                    Wishlist Page
                </Typography>
            </Box>
        </Box>
    );
}