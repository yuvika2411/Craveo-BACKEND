import { Avatar, IconButton, Badge } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {auth}=useSelector(store=>store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin/restaurant")
    } else {
      navigate("/my-profile")
    }
  }

  return (
    <div className="font-[Poppins] w-full fixed top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

        <div onClick={() => navigate('/')} className="text-[22px] font-semibold tracking-wide cursor-pointer ml-4">
          <span className="text-[#ea580c]">Craveo</span>
        </div>

        <div className="hidden md:flex items-center text-[15px] font-medium gap-10 ml-95">

          <p onClick={() => navigate('/')} className="text-[#ea580c] cursor-pointer relative">
            Home
          </p>

          <p className="cursor-pointer hover:text-[#ea580c] transition">
            About
          </p>

          <p className="cursor-pointer hover:text-[#ea580c] transition">
            Blogs
          </p>

          <p className="cursor-pointer hover:text-[#ea580c] transition">
            Contact Us
          </p>

        </div>

        <div className="flex items-center gap-8 mr-5">

          <IconButton>
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>

          <IconButton onClick={() => navigate('/cart')}>
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>

          <div onClick={handleAvatarClick} className="cursor-pointer">
            {auth.user ? <Avatar sx={{ bgcolor: "white", color: "#ea580c", width: 32, height: 32 }}>{auth.user?.fullName?.[0].toUpperCase()}</Avatar> : <Avatar sx={{ bgcolor: "white", width: 32, height: 32 }} />}
          </div>

          <button onClick={() => navigate('/account/register')} className="bg-[#ea580c] px-4 py-2 rounded-full text-sm hover:bg-[#c2410c] transition">
            Sign Up
          </button>

        </div>

      </div>
    </div>
  )
}

export default Navbar;