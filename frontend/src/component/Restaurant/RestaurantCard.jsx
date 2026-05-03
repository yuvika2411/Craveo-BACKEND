import React from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

export const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address?.city}/${item.name}/${item.id}`);
        }
    };

    return (
        <Card className="w-[18rem]">
            <div 
                className={`${item.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}
                onClick={handleNavigateToRestaurant}
            >
                <img 
                    className="w-full h-[10rem] rounded-t-md object-cover"
                    src={item.images && item.images.length > 0 ? item.images[0] : ''}
                    alt={item.name}
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? "success" : "error"}
                    label={item.open ? "Open" : "Closed"}
                />
            </div>
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                        {item.description}
                    </p>
                </div>
                <div>
                    <IconButton>
                        {/* We will implement favorite logic here later, keeping it simple for now */}
                        <FavoriteBorderIcon />
                    </IconButton>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
