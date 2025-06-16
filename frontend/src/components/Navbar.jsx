import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiLogout, HiBell } from "react-icons/hi";
import { toast } from "react-toastify";

import { logoutUser } from "../utils/authUtils";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// 1. Map routes to titles
const routeTitles = {
  "/": "Dashboard",
  "/role": "Role Mangement",
  "/user": "User Mangement",
  "/orders": "All Orders",
  "/employees": "Employees Mangement",
  "/products": "Product Mangement",
  "/product-sale": "Product Sale",
  "/enterprises": "Enterprises Mangement",
};

export const Navbar = ({ onHamburgerClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const user = auth?.user?.name;
console.log(auth)
  // 2. Derive the title, with a fallback
  const title = routeTitles[location.pathname] || "Page";

  // 3. Logout handler with confirmation and toast
  const handleLogout = () => {
    logoutUser(); // clear token/localStorage
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-blue-100 shadow px-6 sticky top-0 z-20 h-13">
      <div className="flex items-center">
        <button
          onClick={onHamburgerClick}
          className="text-gray-600 hover:bg-blue-100 mr-4 lg:hidden"
        >
          <HiMenu size={24} />
        </button>
        {/* 4. Render page title */}
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative text-gray-600 hover:text-amber-600"
          title="Notifications"
        >
          <HiBell size={22} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
          <p className="text-sm font-medium text-gray-800">{user}</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-amber-600 cursor-pointer "
          title="Logout"
        >
          <HiLogout size={22} />
        </button>
      </div>
    </header>
  );
};
