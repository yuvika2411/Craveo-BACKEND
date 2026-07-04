import { Avatar, IconButton, Badge } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const Navbar = () => {
  const { auth, cart } = useSelector(store => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin/restaurant");
    } else {
      navigate("/my-profile");
    }
  };

  const handleHomeClick = () => {
    const element = document.getElementById('hero-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('hero-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleRestaurantsClick = () => {
    const element = document.getElementById('restaurants-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('restaurants-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6 text-white">
        
        {/* LOGO */}
        <div onClick={() => navigate('/')} className="text-2xl font-extrabold text-[#ea580c] tracking-wide cursor-pointer shrink-0 pl-8">
          Craveo
        </div>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 shrink-0">
          <p onClick={handleHomeClick} className="cursor-pointer hover:text-[#ea580c] transition-colors font-medium text-md">
            Home
          </p>
          <p onClick={handleRestaurantsClick} className="cursor-pointer hover:text-[#ea580c] transition-colors font-medium text-md">
            Restaurants
          </p>
        </div>

        {/* LONG SEARCH BAR */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="flex items-center bg-white/5 border border-white/10 hover:border-white/20 focus-within:border-[#ea580c] focus-within:bg-[#000]/30 rounded-full px-4 py-2 transition-all duration-300">
            <SearchIcon sx={{ color: "gray", fontSize: 20, mr: 1.5 }} />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or dishes..."
              className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/search?q=${e.target.value}`);
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Mobile search toggle / icon if screen size is small */}
          <div className="block md:hidden">
            <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
              <SearchIcon sx={{ color: "white", fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white text-xs ml-1.5 w-12 focus:w-24 transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/search?q=${e.target.value}`);
                }}
              />
            </div>
          </div>

          {/* CART ICON */}
          {isLoggedIn && (
            <IconButton onClick={() => navigate('/cart')} className="hover:bg-white/5">
              <Badge badgeContent={cart.cartItems?.length || 0} color="error">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          )}

          {/* USER SECTION */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div onClick={handleAvatarClick} className="cursor-pointer border-2 border-transparent hover:border-[#ea580c] rounded-full transition-all">
                <Avatar sx={{ bgcolor: "white", color: "#ea580c", width: 32, height: 32, fontWeight: 'bold' }}>
                  {auth.user?.fullName?.[0]?.toUpperCase()}
                </Avatar>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold border border-white/10 hover:border-[#ea580c] hover:bg-[#ea580c] px-4 py-1.5 rounded-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div onClick={() => navigate('/account/login')} className="cursor-pointer border-2 border-transparent hover:border-[#ea580c] rounded-full transition-all">
                <Avatar sx={{ bgcolor: "white", color: "gray", width: 32, height: 32 }}>
                  <PersonIcon />
                </Avatar>
              </div>
              <button 
                onClick={() => navigate('/account/register')} 
                className="bg-[#ea580c] hover:bg-[#c2410c] px-4 py-1.5 rounded-lg text-sm font-bold text-white transition-all duration-300 shadow-md shadow-[#ea580c]/20"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;