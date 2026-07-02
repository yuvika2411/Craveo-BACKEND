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

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // instead of reload
  };

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin/restaurant");
    } else {
      navigate("/my-profile");
    }
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

        {/* LOGO */}
        <div onClick={() => navigate('/')} className="text-[22px] font-semibold cursor-pointer">
          <span className="text-[#ea580c]">Craveo</span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-10">
          <p onClick={() => navigate('/')} className="cursor-pointer text-[#ea580c]">
            Home
          </p>

          <p onClick={() => navigate('/about')} className="cursor-pointer hover:text-[#ea580c]">
            About
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* SEARCH */}
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5">
            <SearchIcon sx={{ color: "white", fontSize: 20 }} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white text-sm ml-2 w-24 md:w-40"
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/search?q=${e.target.value}`);
              }}
            />
          </div>

          {/* ✅ CART ICON (ONLY WHEN LOGGED IN) */}
          {isLoggedIn && (
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cart.cartItems?.length || 0} color="error">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          )}

          {/* USER SECTION */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">

              <div onClick={handleAvatarClick} className="cursor-pointer">
                <Avatar sx={{ bgcolor: "white", color: "#ea580c", width: 32, height: 32 }}>
                  {auth.user?.fullName?.[0]?.toUpperCase()}
                </Avatar>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm border px-3 py-1 rounded-md hover:bg-[#ea580c]"
              >
                Logout
              </button>

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
  );
};

export default Navbar;