import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField
} from '@mui/material';

import { createEventAction, getRestaurantEvents, updateEventAction } from '../../State/Restaurant/Action';

export const EventForm = ({ eventItem, onSuccess }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    startedAt: "",
    endsAt: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (eventItem) {
      setEventData({
        name: eventItem.name || "",
        location: eventItem.location || "",
        startedAt: eventItem.startedAt || "",
        endsAt: eventItem.endsAt || ""
      });
      if (eventItem.images && eventItem.images.length > 0) {
        setImagePreview(eventItem.images[0]);
      } else {
        setImagePreview("");
      }
    } else {
      setEventData({
        name: "",
        location: "",
        startedAt: "",
        endsAt: ""
      });
      setSelectedImage(null);
      setImagePreview("");
    }
  }, [eventItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
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
      name: eventData.name,
      location: eventData.location,
      startedAt: eventData.startedAt,
      endsAt: eventData.endsAt
    }));

    if (selectedImage) {
      reqData.append("image", selectedImage);
    } else if (eventItem && eventItem.images && eventItem.images.length > 0) {
      // keep existing image
      reqData.append("event", JSON.stringify({
        name: eventData.name,
        location: eventData.location,
        startedAt: eventData.startedAt,
        endsAt: eventData.endsAt,
        images: eventItem.images
      }));
    }

    try {
      if (eventItem) {
        await dispatch(updateEventAction({ eventId: eventItem.id, reqData, jwt }));
      } else {
        await dispatch(createEventAction({ reqData, jwt }));
      }
      dispatch(
        getRestaurantEvents({
          restaurantId: restaurant.usersRestaurant.id,
          jwt
        })
      );
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to save event:", err);
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
    <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-white">{eventItem ? "Edit Event" : "Create Event"}</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

        <TextField label="Event Name" name="name" value={eventData.name} onChange={handleChange} fullWidth required sx={inputStyle} />

        <TextField label="Location" name="location" value={eventData.location} onChange={handleChange} fullWidth required sx={inputStyle} />

        <div className="grid grid-cols-2 gap-4">
          <TextField 
            label="Start Date & Time" 
            name="startedAt" 
            placeholder="e.g. July 10, 2026 6:00 PM"
            value={eventData.startedAt} 
            onChange={handleChange} 
            fullWidth 
            required 
            sx={inputStyle} 
          />
          <TextField 
            label="End Date & Time" 
            name="endsAt" 
            placeholder="e.g. July 10, 2026 10:00 PM"
            value={eventData.endsAt} 
            onChange={handleChange} 
            fullWidth 
            required 
            sx={inputStyle} 
          />
        </div>

        <div className="col-span-2">
          {imagePreview ? (
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/20">
              <img src={imagePreview} alt="event preview" className="w-full h-full object-cover" />
              <div
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-white font-bold hover:bg-red-700 shadow-md transition"
              >
                X
              </div>
            </div>
          ) : (
            <label className="w-full h-44 border-2 border-dashed border-[#ea580c] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-[#151515] hover:bg-[#1c1c1c] transition">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <div className="text-center">
                <div className="text-4xl mb-2 text-[#ea580c]">📷</div>
                <h3 className="text-white text-md font-semibold">Upload Event Banner</h3>
                <p className="text-gray-400 text-xs mt-1">Single image file allowed</p>
              </div>
            </label>
          )}
        </div>

        <div className="col-span-2">
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}>
            {eventItem ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </div>
  );
};
