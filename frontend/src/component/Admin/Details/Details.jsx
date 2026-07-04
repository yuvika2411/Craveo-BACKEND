import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Switch, FormControlLabel } from '@mui/material';
import { updateRestaurant, updateRestaurantStatus } from '../../State/Restaurant/Action';

export const Details = () => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector(store => store);
    const usersRestaurant = restaurant.usersRestaurant;
    const jwt = localStorage.getItem("jwt");

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        return imagePath.startsWith("http") ? imagePath : `${import.meta.env.VITE_API_URL}${imagePath}`;
    };

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cuisineType: "",
        openingHrs: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        email: "",
        mobileNo: ""
    });
    const [existingImages, setExistingImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [mainImageError, setMainImageError] = useState(false);

    useEffect(() => {
        if (usersRestaurant) {
            setFormData({
                name: usersRestaurant.name || "",
                description: usersRestaurant.description || "",
                cuisineType: usersRestaurant.cuisineType || "",
                openingHrs: usersRestaurant.openingHrs || "",
                street: usersRestaurant.address?.street || "",
                city: usersRestaurant.address?.city || "",
                state: usersRestaurant.address?.state || "",
                pincode: usersRestaurant.address?.pincode || "",
                country: usersRestaurant.address?.country || "India",
                email: usersRestaurant.contactInformation?.email || "",
                mobileNo: usersRestaurant.contactInformation?.mobileNo || ""
            });
            setExistingImages(usersRestaurant.images || []);
            setSelectedImages([]);
            setImagePreviews([]);
            setMainImageError(false);
        }
    }, [usersRestaurant, isEditMode]);

    const handleStatusToggle = () => {
        if (usersRestaurant?.id) {
            dispatch(updateRestaurantStatus({
                restaurantId: usersRestaurant.id,
                jwt
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setSelectedImages(prev => [...prev, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveExistingImage = (idxToRemove) => {
        setExistingImages(prev => prev.filter((_, idx) => idx !== idxToRemove));
    };

    const handleRemoveNewImage = (idxToRemove) => {
        setImagePreviews(prev => prev.filter((_, idx) => idx !== idxToRemove));
        setSelectedImages(prev => prev.filter((_, idx) => idx !== idxToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const restaurantData = new FormData();

        restaurantData.append(
            "restaurant",
            JSON.stringify({
                name: formData.name,
                description: formData.description,
                cuisineType: formData.cuisineType,
                openingHrs: formData.openingHrs,
                address: {
                    id: usersRestaurant.address?.id,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                    country: formData.country
                },
                contactInformation: {
                    email: formData.email,
                    mobileNo: formData.mobileNo
                },
                images: existingImages
            })
        );

        selectedImages.forEach((img) => {
            restaurantData.append("image", img);
        });

        dispatch(
            updateRestaurant({
                restaurantId: usersRestaurant.id,
                data: restaurantData,
                token: jwt
            })
        );
        setIsEditMode(false);
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

    if (!usersRestaurant) {
        return (
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 shadow-xl text-center">
                <p className="text-gray-400">No restaurant details found. Please create a restaurant first.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto font-[Poppins]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 mb-8 relative z-10">
                <div>
                    <h1 className="text-3xl font-bold text-white">{usersRestaurant.name}</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage and update your restaurant settings</p>
                </div>
                <div className="flex items-center gap-4 bg-[#151515] px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-sm font-semibold text-gray-300 font-[Poppins]">Restaurant Status:</span>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={usersRestaurant.open}
                                onChange={handleStatusToggle}
                                color="warning"
                                disabled={restaurant.loading}
                            />
                        }
                        label={
                            <span className={`font-bold text-sm ${usersRestaurant.open ? "text-green-500" : "text-red-500"}`}>
                                {usersRestaurant.open ? "OPEN" : "CLOSED"}
                            </span>
                        }
                    />
                </div>
            </div>

            {isEditMode ? (
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

                    <TextField
                        label="Opening Hours"
                        name="openingHrs"
                        value={formData.openingHrs}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={inputStyle}
                    />

                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-6 mt-6">
                        <h4 className="text-lg font-semibold text-white border-b border-white/5 pb-2 flex items-center gap-2">
                            📷 Restaurant Images
                        </h4>

                        {/* Existing Images */}
                        <div>
                            <span className="text-gray-400 text-sm block mb-3 font-medium">Existing Images (Saved on Cloud):</span>
                            <div className="flex flex-wrap gap-4">
                                {existingImages.map((imgUrl, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 group shadow-md bg-neutral-900 flex items-center justify-center">
                                        <img 
                                            src={getImageUrl(imgUrl)} 
                                            alt={`Existing ${idx + 1}`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 z-10"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151515] text-gray-500 text-[10px] text-center p-1 pointer-events-none">
                                            <span className="text-lg">🍽️</span>
                                            <span className="truncate w-full font-medium">Image {idx + 1}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-xs font-bold shadow-md hover:scale-110 active:scale-95 transition-all z-20"
                                            title="Delete Image"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                {existingImages.length === 0 && (
                                    <p className="text-gray-500 text-xs italic py-2 pl-1">No saved images found for this restaurant.</p>
                                )}
                            </div>
                        </div>

                        {/* Newly Uploaded/Selected Images */}
                        <div>
                            <span className="text-gray-400 text-sm block mb-3 font-medium">New Uploads:</span>
                            <div className="flex flex-wrap gap-4 mb-4">
                                {imagePreviews.map((imgUrl, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 group shadow-md bg-neutral-900">
                                        <img 
                                            src={imgUrl} 
                                            alt={`Preview ${idx + 1}`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNewImage(idx)}
                                            className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-xs font-bold shadow-md hover:scale-110 active:scale-95 transition-all"
                                            title="Remove Image"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Click/Dashed upload box */}
                            <label className="w-full h-32 border-2 border-dashed border-[#ea580c]/50 hover:border-[#ea580c] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 shadow-inner group">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                />
                                <div className="text-center space-y-1">
                                    <div className="text-3xl text-gray-500 group-hover:text-[#ea580c] transition-colors duration-300">📷</div>
                                    <h5 className="text-white text-sm font-semibold tracking-wide">Upload Images</h5>
                                    <p className="text-gray-400 text-xs">Supports multiple files (PNG, JPG, WebP)</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-200 mt-8 mb-4 border-b border-white/10 pb-2">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField label="Street Address" name="street" value={formData.street} onChange={handleChange} fullWidth required sx={inputStyle} />
                        <TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth required sx={inputStyle} />
                        <TextField label="State" name="state" value={formData.state} onChange={handleChange} fullWidth required sx={inputStyle} />
                        <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} fullWidth required sx={inputStyle} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-200 mt-8 mb-4 border-b border-white/10 pb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required sx={inputStyle} />
                        <TextField label="Mobile Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} fullWidth required sx={inputStyle} />
                    </div>

                    {restaurant.error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center text-sm font-semibold">
                            {restaurant.error?.message || "Failed to update restaurant. Please try again."}
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditMode(false)}
                            fullWidth
                            sx={{
                                py: 1.5,
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "12px",
                                textTransform: "none",
                                "&:hover": { borderColor: "#ea580c", backgroundColor: "rgba(234, 88, 12, 0.05)" }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={restaurant.loading}
                            fullWidth
                            sx={{
                                py: 1.5,
                                backgroundColor: "#ea580c",
                                fontWeight: "bold",
                                borderRadius: "12px",
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#c2410c" }
                            }}
                        >
                            {restaurant.loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {usersRestaurant.images && usersRestaurant.images.length > 0 && !mainImageError ? (
                            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                <img 
                                    src={getImageUrl(usersRestaurant.images[0])} 
                                    alt={usersRestaurant.name} 
                                    className="w-full h-full object-cover" 
                                    onError={() => setMainImageError(true)}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-64 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-[#151515] text-gray-500">
                                <span className="text-4xl mb-2">🍽️</span>
                                <span className="text-sm font-semibold">{usersRestaurant.name}</span>
                            </div>
                        )}
                        <div className="flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <span className="text-[#ea580c] font-bold text-xs uppercase tracking-wider">Cuisine Type</span>
                                <h3 className="text-xl font-semibold text-white">{usersRestaurant.cuisineType}</h3>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[#ea580c] font-bold text-xs uppercase tracking-wider">Opening Hours</span>
                                <p className="text-gray-300 text-sm">{usersRestaurant.openingHrs}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[#ea580c] font-bold text-xs uppercase tracking-wider">About</span>
                                <p className="text-gray-400 text-sm leading-relaxed">{usersRestaurant.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-8">
                        <div className="bg-[#151515] p-6 rounded-2xl border border-white/5">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                📍 Location Details
                            </h4>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p><span className="text-gray-500">Street:</span> {usersRestaurant.address?.street || "N/A"}</p>
                                <p><span className="text-gray-500">City:</span> {usersRestaurant.address?.city || "N/A"}</p>
                                <p><span className="text-gray-500">State:</span> {usersRestaurant.address?.state || "N/A"}</p>
                                <p><span className="text-gray-500">Pincode:</span> {usersRestaurant.address?.pincode || "N/A"}</p>
                                <p><span className="text-gray-500">Country:</span> {usersRestaurant.address?.country || "India"}</p>
                            </div>
                        </div>

                        <div className="bg-[#151515] p-6 rounded-2xl border border-white/5">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                📞 Contact Information
                            </h4>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p><span className="text-gray-500">Email:</span> {usersRestaurant.contactInformation?.email || "N/A"}</p>
                                <p><span className="text-gray-500">Mobile:</span> {usersRestaurant.contactInformation?.mobileNo || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            variant="contained"
                            onClick={() => setIsEditMode(true)}
                            fullWidth
                            sx={{
                                py: 1.5,
                                backgroundColor: "#ea580c",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderRadius: "12px",
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#c2410c" }
                            }}
                        >
                            Edit Restaurant Details
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
