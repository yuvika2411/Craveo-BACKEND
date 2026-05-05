import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantEvents, deleteEventAction } from '../../State/Restaurant/Action';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export const Events = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantEvents(restaurant.usersRestaurant.id, jwt));
        }
    }, [dispatch, restaurant.usersRestaurant, jwt]);

    const handleDelete = (id) => {
        dispatch(deleteEventAction(id));
    };

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-white">Restaurant Events</h1>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="events table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Event Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(restaurant.restaurantsEvents) && restaurant.restaurantsEvents.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    {item.images && item.images.length > 0 && (
                                        <img src={item.images[0]} alt="event" className="w-16 h-16 object-cover rounded-lg" />
                                    )}
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                                <TableCell sx={{ color: 'gray' }}>{item.location}</TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    {item.startedAt} to {item.endsAt}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(item.id)} color="error" variant="outlined" size="small">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!Array.isArray(restaurant.restaurantsEvents) || restaurant.restaurantsEvents.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ color: 'gray', py: 5 }}>
                                    No events found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
