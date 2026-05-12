import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../State/Restaurant/Action';
import { Button, TextField } from '@mui/material';

export const CreateRestaurant = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cuisineType: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India"
        },
        contactInformation: {
            email: "",
            mobile: "",
            twitter: "",
            instagram: ""
        },
        openingHrs: "Mon-Sun: 9:00 AM - 10:00 PM",
        images: []
    });
    const [imageInput, setImageInput] = useState("");

    const handleAddImage = () => {
        if (imageInput.trim()) {
            setFormData({ ...formData, images: [...formData.images, imageInput.trim()] });
            setImageInput("");
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRestaurant({ data: formData, token: jwt }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [name]: value
            }
        });
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            contactInformation: {
                ...formData.contactInformation,
                [name]: value
            }
        });
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
        <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-8 relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">Create Your Restaurant</h1>
                <p className="text-gray-400">Please fill out the details to register your restaurant on Craveo.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField 
                        label="Restaurant Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        fullWidth 
                        required 
                        sx={inputStyle} 
                    />
                    <TextField 
                        label="Cuisine Type" 
                        name="cuisineType" 
                        value={formData.cuisineType} 
                        onChange={handleChange} 
                        fullWidth 
                        required 
                        sx={inputStyle} 
                    />
                </div>
                
                <TextField 
                    label="Description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    fullWidth 
                    multiline 
                    rows={3} 
                    required 
                    sx={inputStyle} 
                />

                <h3 className="text-xl font-bold text-gray-200 mt-8 mb-4 border-b border-white/10 pb-2">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField label="Street Address" name="street" value={formData.address.street} onChange={handleAddressChange} fullWidth required sx={inputStyle} />
                    <TextField label="City" name="city" value={formData.address.city} onChange={handleAddressChange} fullWidth required sx={inputStyle} />
                    <TextField label="State" name="state" value={formData.address.state} onChange={handleAddressChange} fullWidth required sx={inputStyle} />
                    <TextField label="Pincode" name="pincode" value={formData.address.pincode} onChange={handleAddressChange} fullWidth required sx={inputStyle} />
                </div>

                <h3 className="text-xl font-bold text-gray-200 mt-8 mb-4 border-b border-white/10 pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField label="Email" name="email" value={formData.contactInformation.email} onChange={handleContactChange} fullWidth required sx={inputStyle} />
                    <TextField label="Mobile Number" name="mobile" value={formData.contactInformation.mobile} onChange={handleContactChange} fullWidth required sx={inputStyle} />
                    <TextField label="Instagram URL (optional)" name="instagram" value={formData.contactInformation.instagram} onChange={handleContactChange} fullWidth sx={inputStyle} />
                    <TextField label="Twitter URL (optional)" name="twitter" value={formData.contactInformation.twitter} onChange={handleContactChange} fullWidth sx={inputStyle} />
                </div>

                <h3 className="text-xl font-bold text-gray-200 mt-8 mb-4 border-b border-white/10 pb-2">Restaurant Images</h3>
                <div className="flex gap-4 mb-4">
                    <TextField 
                        label="Image URL" 
                        value={imageInput} 
                        onChange={(e) => setImageInput(e.target.value)} 
                        fullWidth 
                        sx={inputStyle} 
                    />
                    <Button variant="outlined" onClick={handleAddImage} sx={{ color: '#ea580c', borderColor: '#ea580c', '&:hover': { borderColor: 'white' } }}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                    {formData.images.map((img, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/20">
                            <img src={img} alt="restaurant" className="w-full h-full object-cover" />
                            <div onClick={() => handleRemoveImage(idx)} className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-white text-xs font-bold hover:bg-red-700">X</div>
                        </div>
                    ))}
                </div>

                <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    sx={{ 
                        mt: 4, 
                        py: 1.5, 
                        backgroundColor: "#ea580c", 
                        fontSize: "1.1rem", 
                        fontWeight: "bold", 
                        borderRadius: "12px",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#c2410c" }
                    }}
                >
                    Create Restaurant
                </Button>
            </form>
        </div>
    );
};
