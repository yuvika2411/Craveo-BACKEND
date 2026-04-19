import React from "react";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const initialAddresses = [
  {
      id: 1,
      title: "Home",
      address: "1204, New Shivam Building, Gokuldham Market, Andheri East, Mumbai, 400068, Maharashtra, India"
  },
  {
      id: 2,
      title: "Workspace",
      address: "7th Floor, Tech Park, Mindspace, Malad West, Mumbai, 400064, Maharashtra, India"
  }
];

const Address = () => {
  return (
    <div className="min-h-[80vh] bg-[#0f0f0f] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Saved Addresses</h1>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: "#ea580c", 
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#c2410c" } 
          }}
        >
          Add New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {initialAddresses.map((address) => (
          <div 
              key={address.id} 
              className="bg-[#151515] rounded-2xl p-6 transition-all duration-300 flex flex-col min-h-[160px] border border-white/5 hover:border-[#ea580c]/50 hover:bg-[#1a1a1a] group"
          >
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#222] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white transition-colors duration-300">
                      <HomeIcon fontSize="small" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-200 tracking-wide">{address.title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {address.address}
              </p>
              <div className="mt-4 flex gap-3">
                <span className="text-[#ea580c] text-sm font-semibold cursor-pointer hover:underline">Edit</span>
                <span className="text-red-500 text-sm font-semibold cursor-pointer hover:underline">Delete</span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
