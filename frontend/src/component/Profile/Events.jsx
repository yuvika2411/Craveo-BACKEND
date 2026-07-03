import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Button, Dialog, DialogContent, TextField, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerEventsAction, bookEventAction, getAllRestaurantsAction } from "../State/Restaurant/Action";

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    restaurantId: "",
    name: "",
    location: "",
    startedAt: "",
    endsAt: "",
    guests: 2
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(getCustomerEventsAction(jwt));
    dispatch(getAllRestaurantsAction(jwt));
  }, [dispatch, jwt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "restaurantId") {
      const selectedRes = restaurant.restaurants.find(r => r.id === value);
      setFormData({
        ...formData,
        restaurantId: value,
        location: selectedRes?.address?.streetAddress || selectedRes?.address?.city || ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = new FormData();
    reqData.append("event", JSON.stringify({
      name: formData.name,
      location: formData.location,
      startedAt: formData.startedAt,
      endsAt: formData.endsAt,
      guests: Number(formData.guests)
    }));

    if (selectedImage) {
      reqData.append("image", selectedImage);
    }

    try {
      await dispatch(bookEventAction({ restaurantId: formData.restaurantId, reqData, jwt }));
      dispatch(getCustomerEventsAction(jwt));
      setFormData({
        restaurantId: "",
        name: "",
        location: "",
        startedAt: "",
        endsAt: "",
        guests: 2
      });
      setSelectedImage(null);
      setImagePreview("");
      setOpen(false);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&:hover fieldset': { borderColor: '#ea580c' },
      '&.Mui-focused fieldset': { borderColor: '#ea580c' },
    },
    '& .MuiInputLabel-root': { color: 'gray' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c' },
  };

  return (
    <div className="h-full bg-[#0f0f0f] flex flex-col font-[Poppins]">
        <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Your Booked Events</h1>
              <p className="text-gray-400 text-sm mt-1">Book and manage tables for events</p>
            </div>
            <Button 
              variant="contained" 
              onClick={() => setOpen(true)}
              sx={{ 
                backgroundColor: "#ea580c", 
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#c2410c" } 
              }}
            >
              Book Event
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {restaurant.events?.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
            {(!restaurant.events || restaurant.events.length === 0) && (
              <div className="col-span-2 text-center py-10 bg-[#151515] rounded-2xl border border-white/5">
                <p className="text-gray-400">You haven't booked any events yet. Click 'Book Event' to schedule one!</p>
              </div>
            )}
        </div>

        {/* Book Event Modal */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogContent sx={{ background: '#1a1a1a', p: 4 }}>
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Book an Event</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              
              <TextField 
                select
                label="Select Restaurant" 
                name="restaurantId" 
                value={formData.restaurantId} 
                onChange={handleChange} 
                fullWidth 
                required 
                sx={inputStyle}
              >
                {restaurant.restaurants?.map(r => (
                  <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                ))}
              </TextField>

              <TextField 
                label="Event Name" 
                name="name" 
                placeholder="e.g. Birthday Party, Corporate Dinner"
                value={formData.name} 
                onChange={handleChange} 
                fullWidth 
                required 
                sx={inputStyle} 
              />

              <TextField 
                label="Location / Preference" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                fullWidth 
                required 
                sx={inputStyle} 
              />

              <div className="grid grid-cols-3 gap-4">
                <TextField 
                  label="Start Date & Time" 
                  name="startedAt" 
                  placeholder="e.g. July 10, 6:00 PM"
                  value={formData.startedAt} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  sx={inputStyle} 
                />
                <TextField 
                  label="End Date & Time" 
                  name="endsAt" 
                  placeholder="e.g. July 10, 10:00 PM"
                  value={formData.endsAt} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  sx={inputStyle} 
                />
                <TextField 
                  label="Guests Count" 
                  name="guests" 
                  type="number"
                  value={formData.guests} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  sx={inputStyle} 
                />
              </div>

              <div>
                {imagePreview ? (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-white/20">
                    <img src={imagePreview} alt="event preview" className="w-full h-full object-cover" />
                    <div
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-white font-bold hover:bg-red-700 shadow-md transition"
                    >
                      X
                    </div>
                  </div>
                ) : (
                  <label className="w-full h-40 border-2 border-dashed border-[#ea580c] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-[#151515] hover:bg-[#1c1c1c] transition">
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-2 text-[#ea580c]">📷</div>
                      <Typography sx={{ color: 'white', fontWeight: 'semibold' }}>Upload Optional Photo</Typography>
                    </div>
                  </label>
                )}
              </div>

              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#ea580c', py: 1.5, fontWeight: 'bold', '&:hover': { backgroundColor: '#c2410c' } }}>
                Request Event Booking
              </Button>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default Events;
