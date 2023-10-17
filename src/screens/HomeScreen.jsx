import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <Header />
      {/* Main content */}
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-5xl font-bold mb-4">Elegance, Simplified.</h1>
        <h2 className="text-3xl mb-6">
          Introducing MinimalAura - Your New Haven of Minimalist Fashion
        </h2>
        <p className="mb-8 text-lg">
          Step into a world where fashion meets simplicity. At MinimalAura...
          {/* ...rest of the content remains unchanged */}
        </p>

        <div className="grid grid-cols-3 gap-8 mb-16">
          <img
            src="/img/1.jpeg"
            alt="Placeholder Image 1"
            className="rounded shadow-lg"
          />
          <img
            src="/img/2.jpeg"
            alt="Placeholder Image 2"
            className="rounded shadow-lg"
          />
          <img
            src="/img/3.jpeg"
            alt="Placeholder Image 3"
            className="rounded shadow-lg"
          />
        </div>

        {/* ...rest of the content remains unchanged */}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 py-16 shadow-md">
        <div className="container mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">About Us</h4>
            <p className="text-sm">Learn more about our mission and values.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <FacebookIcon className="hover:text-indigo-500" />
              <TwitterIcon className="hover:text-indigo-500" />
              <InstagramIcon className="hover:text-indigo-500" />
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-end items-end">
            <div className="text-right">
              <p className="text-sm">
                &copy; 2023 MinimalAura. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
