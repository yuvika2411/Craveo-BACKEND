import React from "react";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0b0b0b] text-white border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h1
              onClick={() => navigate("/")}
              className="text-4xl font-extrabold text-[#ea580c] cursor-pointer"
            >
              Craveo
            </h1>

            <p className="text-gray-400 mt-4 leading-7 text-sm">
              Discover your favourite restaurants, order delicious meals,
              and get them delivered fresh to your doorstep.
            </p>

            <div className="flex gap-2 mt-6">

              <IconButton
                sx={{
                  bgcolor: "#171717",
                  color: "#ea580c",
                  "&:hover": { bgcolor: "#262626" },
                }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "#171717",
                  color: "#ea580c",
                  "&:hover": { bgcolor: "#262626" },
                }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "#171717",
                  color: "#ea580c",
                  "&:hover": { bgcolor: "#262626" },
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: "#171717",
                  color: "#ea580c",
                  "&:hover": { bgcolor: "#262626" },
                }}
              >
                <TwitterIcon />
              </IconButton>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                About Us
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Contact Us
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Careers
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Blog
              </li>

            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Restaurants
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Popular Foods
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Offers
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Become a Partner
              </li>

            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Terms & Conditions
              </li>

              <li className="hover:text-[#ea580c] cursor-pointer transition">
                Refund Policy
              </li>

            </ul>
          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500">
            © 2026 <span className="text-white font-semibold">Craveo</span>.
            All Rights Reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> in India
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
