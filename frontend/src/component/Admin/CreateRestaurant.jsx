import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant } from '../State/Restaurant/Action';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_RESTAURANT_BY_USER_ID_SUCCESS } from '../State/Restaurant/ActionType';

export const CreateRestaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { restaurant } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        return imagePath.startsWith("http") ? imagePath : `http://localhost:8081${imagePath}`;
    };
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
            mobileNo: ""
        },
        openingHrs: "Mon-Sun: 9:00 AM - 10:00 PM",
        images: []
    });

    const [selectedImage, setSelectedImage] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;
        setSelectedImage(files);

        const previews =
            files.map(
                file =>
                    URL.createObjectURL(file)
            );

        setFormData({
            ...formData,
            images: previews
        });
    };

    const handleRemoveImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const restaurantData = new FormData();

        restaurantData.append(
            "restaurant",
            JSON.stringify({
                ...formData,
                images: []
            })
        );

        selectedImage.forEach((img) => {
            restaurantData.append(
                "image",
                img
            );
        });

        dispatch(
            createRestaurant({
                data: restaurantData,
                token: jwt
            })
        );
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

    if (isSubmitted && restaurant.restaurant && !restaurant.loading && !restaurant.error) {
        const createdRest = restaurant.restaurant;
        return (
            <div className="max-w-2xl mx-auto bg-[#1a1a1a] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-lg shadow-green-500/5">
                    <span className="text-4xl">🎉</span>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">Restaurant Created!</h1>
                <p className="text-gray-400 mb-8">Your restaurant has been successfully registered on Craveo.</p>

                <div className="bg-[#151515] rounded-2xl p-6 border border-white/5 text-left mb-8 space-y-4">
                    {createdRest.images && createdRest.images.length > 0 && (
                        <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-white/10">
                            <img src={getImageUrl(createdRest.images[0])} alt={createdRest.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl font-bold text-[#ea580c]">{createdRest.name}</h3>
                        <p className="text-gray-300 text-sm mt-1">{createdRest.description}</p>
                    </div>
                    
                    <div className="border-t border-white/5 pt-4 space-y-2 text-sm text-gray-400">
                        <p><span className="text-gray-500">Cuisine:</span> {createdRest.cuisineType}</p>
                        <p><span className="text-gray-500">Opening Hours:</span> {createdRest.openingHrs}</p>
                        <p><span className="text-gray-500">Address:</span> {createdRest.address ? `${createdRest.address.street}, ${createdRest.address.city}, ${createdRest.address.state} - ${createdRest.address.pincode}` : "N/A"}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => {
                            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: createdRest });
                            navigate("/admin/restaurant/details");
                        }}
                        variant="outlined"
                        size="large"
                        sx={{
                            flex: 1,
                            py: 1.5,
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            textTransform: "none",
                            "&:hover": { borderColor: "#ea580c", backgroundColor: "rgba(234, 88, 12, 0.05)" }
                        }}
                    >
                        Edit Details
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: createdRest });
                            navigate("/admin/restaurant");
                        }}
                        variant="contained"
                        size="large"
                        sx={{
                            flex: 1,
                            py: 1.5,
                            backgroundColor: "#ea580c",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#c2410c" }
                        }}
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

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
                    sx={{
                        ...inputStyle,
                        mb: 3
                    }}
                />
                
                <TextField
                    label="Opening Hours"
                    name="openingHrs"
                    value={formData.openingHrs}
                    onChange={handleChange}
                    fullWidth
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
                    <TextField label="Mobile Number" name="mobileNo" value={formData.contactInformation.mobileNo} onChange={handleContactChange} fullWidth required sx={inputStyle} />
                </div>

                <div className="mb-6">

                <label
                className=" w-full h-44 border-2 border-dashed
                border-[#ea580c]
                rounded-2xl
                flex
                flex-col    
                items-center
                justify-center
                cursor-pointer
                bg-[#151515]
                hover:bg-[#1c1c1c]
                transition
                "
                >

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                />

                <div className="text-center">

                <div className="text-5xl mb-3">
                📷
                </div>

                <h3 className="text-white text-lg font-semibold">
                Upload Restaurant Image
                </h3>

                <p className="text-gray-400 text-sm">
                Click to select image
                </p>

                </div>

                </label>

                </div>      
                <div className="flex flex-wrap gap-4 mb-6">
                    {formData.images.map((img, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/20">
                            <img src={img} alt="restaurant" className="w-full h-full object-cover" />
                            <div onClick={() => handleRemoveImage(idx)} className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-white text-xs font-bold hover:bg-red-700">X</div>
                        </div>
                    ))}
                </div>

                {restaurant.error && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center text-sm font-semibold">
                        {restaurant.error?.message || "Failed to create restaurant. Please try again."}
                    </div>
                )}

                <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    disabled={restaurant.loading}
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
                    {restaurant.loading ? "Creating..." : "Create Restaurant"}
                </Button>
            </form>
        </div>
    );
};
