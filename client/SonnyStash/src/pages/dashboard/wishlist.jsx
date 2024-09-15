import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../context/userContext";
import { Box, Typography, useTheme, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from "./navbar.jsx";
import axios from 'axios'; // Import axios for API requests

export default function Wishlist() {
    const theme = useTheme();
    const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            // Fetch wishlist data from the server
            const fetchWishlist = async () => {
                try {
                    const response = await axios.get(`/wishlist/${user.id}`);
                    setWishlist(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchWishlist();
        }
    }, [user]);

    return (
        <Box sx={{
            backgroundColor: theme.palette.main.beige,
            width: '100%',
            height: '100%',
        }}>
            <Navbar />
            <Box display={'flex'} flexDirection={'column'} justifyContent={"center"} alignItems={'center'} padding={5}>
                <Box sx={{ maxWidth: '800px', textAlign: 'center', marginTop: '5rem' }}>
                    <Typography variant="h2" fontWeight={"bold"} fontSize={25} sx={{ marginBottom: '1.5rem' }}>
                        Welcome to your Wishlist!
                    </Typography>
                    <Typography variant="body1" fontSize={16.5}>
                        Here, you can keep track of all the Sonny Angels you've got your eye on.
                    </Typography>
                    <Typography variant="body1" fontSize={16.5} mb={2}>
                        Whether it's a rare figurine you’ve been dreaming about or a new addition to complete your collection, your Wishlist is the perfect place to organize and prioritize your desired Sonny Angels.
                    </Typography>
                </Box>

                {/* Display Wishlist Items */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '2rem' }}>
                    {wishlist.map((item, idx) => (
                        <Card key={idx} sx={{ width: '150px', marginBottom: '1rem', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="275"
                                image={item.product_image_url}
                                alt={item.product_name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
