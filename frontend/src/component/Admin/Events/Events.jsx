import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantEvents, deleteEventAction, updateEventStatusAction } from '../../State/Restaurant/Action';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EventForm } from './EventForm';

export const Events = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    // States for create/edit dialog
    const [formOpen, setFormOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // States for custom delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantEvents({ restaurantId: restaurant.usersRestaurant.id, jwt }));
        }
    }, [dispatch, restaurant.usersRestaurant?.id, jwt]);

    const openDeleteDialog = (id) => {
        setEventToDelete(id);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setEventToDelete(null);
        setDeleteDialogOpen(false);
    };

    const confirmDeleteEvent = () => {
        if (eventToDelete) {
            dispatch(deleteEventAction({ eventId: eventToDelete, jwt }));
        }
        closeDeleteDialog();
    };

    const handleUpdateStatus = (eventId, newStatus) => {
        dispatch(updateEventStatusAction({ eventId, status: newStatus, jwt }));
    };

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl font-[Poppins]">
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Event Bookings</h1>
                    <p className="text-gray-400 mt-1">Manage customer table and hall reservations</p>
                </div>
                <Button 
                    variant="contained" 
                    onClick={() => { setSelectedEvent(null); setFormOpen(true); }}
                    sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
                >
                    Add Booking
                </Button>
            </div>

            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="events table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Event Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Guests</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date & Time</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(restaurant.restaurantsEvents) && restaurant.restaurantsEvents.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    {item.images && item.images.length > 0 ? (
                                        <img src={item.images[0]} alt="event" className="w-16 h-16 object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center text-gray-500">
                                            No Banner
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '500' }}>{item.name}</TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    <div>{item.customer?.fullName || "Walk-in Guest"}</div>
                                    <div className="text-gray-500 text-xs">{item.customer?.email}</div>
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.guests || 2} Guests</TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    <div>{item.startedAt}</div>
                                    {item.endsAt && <div className="text-gray-500 text-xs">to {item.endsAt}</div>}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.status || "Pending"}
                                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                                        size="small"
                                        sx={{
                                            color: item.status === 'Confirmed' ? '#22c55e' : item.status === 'Cancelled' ? '#ef4444' : '#eab308',
                                            backgroundColor: 'rgba(255,255,255,0.02)',
                                            borderRadius: '8px',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' }
                                        }}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell align="right">
                                    <div className="flex justify-end gap-2">
                                        <IconButton 
                                            onClick={() => { setSelectedEvent(item); setFormOpen(true); }}
                                            sx={{ color: '#ea580c', '&:hover': { color: '#c2410c' } }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton 
                                            onClick={() => openDeleteDialog(item.id)} 
                                            sx={{ color: '#ef4444', '&:hover': { color: '#b91c1c' } }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!restaurant.restaurantsEvents || restaurant.restaurantsEvents.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ color: 'gray', py: 5 }}>
                                    No reservations found. Create one above to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Event Form Dialog */}
            <Dialog 
                open={formOpen} 
                onClose={() => { setFormOpen(false); setSelectedEvent(null); }}
                maxWidth="md"
                fullWidth
            >
                <DialogContent sx={{ background: '#1a1a1a', p: 0 }}>
                    <EventForm 
                        eventItem={selectedEvent} 
                        onSuccess={() => { setFormOpen(false); setSelectedEvent(null); }} 
                    />
                </DialogContent>
            </Dialog>

            {/* Custom Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1a1a',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '12px'
                    }
                }}
            >
                <DialogTitle sx={{ color: 'white', fontWeight: 'bold' }}>
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#a3a3a3' }}>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ gap: '10px', mt: 2 }}>
                    <Button 
                        onClick={closeDeleteDialog} 
                        sx={{ 
                            color: 'white', 
                            textTransform: 'none', 
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } 
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={confirmDeleteEvent} 
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#ea580c', 
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#c2410c' } 
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
