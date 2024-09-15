import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Box, Typography, useTheme, Button, Card, CardContent, CardMedia, TextField, IconButton } from '@mui/material';
import Navbar from "./navbar.jsx";
import jsonData from '../../../../../SonnyAngelData/sonny_angel_data.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios for API requests

export default function Search() {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useContext(UserContext); // Retrieve user context

    useEffect(() => {
        // Set the initial data
        if (jsonData && jsonData.length > 0) {
            setData(jsonData);
        }
    }, []); // Run this effect only once

    const handleCollectionSelect = (collectionName) => {
        setSelectedCollection(collectionName);
        setSelectedSeries(null); // Reset the series selection
    };

    const handleSeriesSelect = (seriesName) => {
        setSelectedSeries(seriesName);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const getFilteredProducts = () => {
        let products = [];
        if (selectedCollection) {
            const selectedData = data.find(collection => collection.collection_name === selectedCollection);
            if (selectedSeries) {
                products = selectedData.series.find(series => series.series_name === selectedSeries).products;
            } else {
                products = selectedData.series.flatMap(series => series.products);
            }
        } else {
            products = data.flatMap(collection => collection.series.flatMap(series => series.products));
        }

        return products.filter(product => 
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredProducts = getFilteredProducts();

    const notify = (message) => {
        toast(message);
    };

    const addToWishlist = async (product) => {
        try {
            await axios.post('/wishlist', {
                userId: user.id,
                product: product
            });
            notify('Added to Wishlist: ' + product.product_name);
        } catch (error) {
            console.error(error);
            notify('Failed to add to Wishlist');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.main.beige,
                width: '100%',
                height: '100%',
            }}
        >
            <Navbar />
            <Box
                sx={{
                    backgroundColor: theme.palette.main.beige,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    padding: '2rem',
                    boxSizing: 'border-box'
                }}
            >
                <Box display={'flex'} flexDirection={'column'} justifyContent={"center"} alignItems={'center'} padding={5}>
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

                    {/* Search Box */}
                    <Box sx={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <TextField 
                            variant="outlined"
                            placeholder="Search for a product..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{ width: '300px' }}
                        />
                    </Box>
                </Box>

                <Box sx={{marginBottom: '20px'}}>
                    <Typography variant="h5" fontWeight={"bold"}>COLLECTIONS:</Typography>
                </Box>

                {/* Render Collection Buttons */}
                <Box sx={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    {data.map((collection, index) => (
                        <Button
                            key={index} 
                            variant={selectedCollection === collection.collection_name ? "contained" : "outlined"} 
                            onClick={() => handleCollectionSelect(collection.collection_name)}
                        >
                            {collection.collection_name}
                        </Button>
                    ))}
                </Box>

                {/* Render Series Buttons if a collection is selected */}
                {selectedCollection && (
                    <Box> 
                        <Box sx={{marginBottom: '20px'}}>
                            <Typography variant="h5" fontWeight={"bold"}>SERIES:</Typography>
                        </Box>
                        <Box sx={{ marginTop: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent:'center'}}>
                            {data.find(collection => collection.collection_name === selectedCollection).series.map((series, idx) => (
                                <Button 
                                    key={idx} 
                                    variant={selectedSeries === series.series_name ? "contained" : "outlined"} 
                                    onClick={() => handleSeriesSelect(series.series_name)}
                                >
                                    {series.series_name}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Display Filtered Products */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '2rem' }}>
                    {filteredProducts.map((product, idx) => (
                        <Card key={idx} sx={{ width: '150px', marginBottom: '1rem', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="275"
                                image={product.product_image_url}
                                alt={product.product_name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {product.product_name}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                    <IconButton 
                                        onClick={() => {
                                            console.log('Added to Collection:', product);
                                            notify('Added to Collection: ' + product.product_name);
                                        }} 
                                        color="primary"
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => addToWishlist(product)} 
                                        color="error"
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
}
