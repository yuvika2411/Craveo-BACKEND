import { Avatar, IconButton, Badge } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <div className="font-[Poppins] w-full fixed top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

        <div className="text-[22px] italic font-semibold tracking-wide cursor-pointer">
          <span className="text-[#ea580c]">Craveo</span>
        </div>

        <div className="hidden md:flex items-center text-[15px] font-medium">

          <p className="text-[#ea580c] cursor-pointer relative mr-20 ml-50">
            Home
            <span className="absolute left-0 -bottom-1 w-full  bg-[#ea580c]"></span>
          </p>


          <p className="cursor-pointer hover:text-[#ea580c] transition relative group  mr-20">
            About
            <span className="absolute left-0 -bottom-1 w-0  bg-[#ea580c] transition-all group-hover:w-full"></span>
          </p>

          <p className="cursor-pointer hover:text-[#ea580c] transition relative group mr-20">
            Blogs
            <span className="absolute left-0 -bottom-1 w-0  bg-[#ea580c] transition-all group-hover:w-full"></span>
          </p>
    
          <p className="cursor-pointer hover:text-[#ea580c] transition relative group">
            Contact Us
            <span className="absolute left-0 -bottom-1 w-0  bg-[#ea580c] transition-all group-hover:w-full"></span>
          </p>

        </div>

        <div className="flex items-center gap-5 lg:gap-8 ">

          <IconButton className="hover:bg-white/10 transition">
            <SearchIcon sx={{ color: "white", fontSize: "1.6rem" }} />
          </IconButton>


          <IconButton className="hover:bg-white/10 transition">
            <Badge
              badgeContent={2}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ea580c",
                  color: "white",
                  fontSize: "0.65rem",
                  minWidth: "16px",
                  height: "16px"
                }
              }}
            >
              <ShoppingCartIcon sx={{ color: "white", fontSize: "1.6rem" }} />
            </Badge>
          </IconButton>

          <Avatar 
            sx={{ 
              bgcolor: "white",
              width: 32,
              height: 32,
              fontSize: "0.8rem"
            }} 
          />

          <button className="ml-2 bg-[#d2510b] px-4 py-2 rounded-full text-[14px] font-medium hover:bg-[#c2410c] transition shadow-md shadow-[#ea580c]/20">
            Sign Up
          </button>

        </div>

      </div>
    </div>
  )
}

export default Navbar