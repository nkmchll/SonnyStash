import { Link } from "react-router-dom";
import './navbar.css';
import { Box, Typography, useTheme } from '@mui/material';

const Navbar = () => {
    const theme = useTheme();
    return (
        <nav>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 40px' }}>
                <Typography variant="h1" fontSize={40} color={theme.palette.main.beige} sx={{ WebkitTextStroke: "1.5px black" }}>
                    SonnyStash
                </Typography>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                <Link to='/dashboard' style={{ fontSize: '20px', fontFamily: 'Montserrat', color: theme.palette.beige }}>DASHBOARD</Link>
                <Link to='/search' style={{ fontSize: '20px', fontFamily: 'Montserrat', color: theme.palette.beige }}>SEARCH</Link>
                <Link to='/wishlist' style={{ fontSize: '20px', fontFamily: 'Montserrat', color: theme.palette.beige }}>WISHLIST</Link>
                </Box>
            </Box>
        </nav>
    );
};

export default Navbar;
