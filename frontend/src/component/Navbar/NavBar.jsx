import { Avatar, IconButton, Badge } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {auth, cart} = useSelector(store => store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin/restaurant");
    } else {
      navigate("/my-profile");
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

          <p onClick={() => navigate('/about')} className="cursor-pointer hover:text-[#ea580c] transition">
            About
          </p>


        </div>

        <div className="flex items-center gap-8 mr-5">

          <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 focus-within:ring-2 ring-[#ea580c] transition-all">
            <SearchIcon sx={{ color: "white", fontSize: 20 }} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-white text-sm ml-2 w-24 md:w-40 placeholder-gray-400"
              onKeyDown={(e) => {
                if(e.key === 'Enter') navigate(`/search?q=${e.target.value}`);
              }}
            />
          </div>

          {auth.user && (
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cart.cartItems?.length || 0} color="error">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          )}

          {auth.user ? (
            <div onClick={handleAvatarClick} className="cursor-pointer">
              <Avatar sx={{ bgcolor: "white", color: "#ea580c", width: 32, height: 32 }}>{auth.user?.fullName?.[0].toUpperCase()}</Avatar>
            </div>
          ) : (
            <div onClick={() => navigate('/account/login')} className="cursor-pointer">
              <Avatar sx={{ bgcolor: "white", color: "gray", width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
            </div>
          )}

      </div>
      </div>
    </div>
  )
}

export default Navbar;