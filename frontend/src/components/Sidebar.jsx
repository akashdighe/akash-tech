import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaUserTie,
  FaBoxOpen,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/", key: "dashboard", icon: <FaTachometerAlt /> },
  { name: "Roles", path: "/role", key: "roles", icon: <FaUserShield /> },
  { name: "Users", path: "/user", key: "users", icon: <FaUsers /> },
  {
    name: "Employees",
    path: "/employees",
    key: "employees",
    icon: <FaUserTie />,
  },
  { name: "Products", path: "/products", key: "products", icon: <FaBoxOpen /> },
  {
    name: "Products Sale",
    path: "/product-sale",
    key: "productSale",
    icon: <FaChartLine />,
  },
  {
    name: "Enterprises",
    path: "/enterprises",
    key: "enterprises",
    icon: <FaBuilding />,
  },
];

const SidebarItem = ({ item, isActive }) => (
  <Link
    to={item.path}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors 
      ${
        isActive
          ? "bg-white text-blue-700 shadow-sm"
          : "text-gray-200 hover:bg-blue-700 hover:text-white"
      }
    `}
    aria-current={isActive ? "page" : undefined}
  >
    <span className="text-lg">{item.icon}</span>
    <span>{item.name}</span>
  </Link>
);

export const Sidebar = ({ open, onClose, permissions }) => {
  const location = useLocation();

  const hasReadPermission = (key) =>
    permissions?.some((p) => p.module === key && p.read);

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-[#1e2c4b] z-30 transform transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
    >
      <div className="flex items-center justify-between p-5 bg-[#1e2c4b] border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Enterprise Management</h2>
      </div>

      <nav className="flex flex-col gap-1 px-4 py-5">
        {navItems.map((item) => {
          if (!hasReadPermission(item.key)) return null;
          const isActive = location.pathname === item.path;
          return <SidebarItem key={item.key} item={item} isActive={isActive} />;
        })}
      </nav>
    </aside>
  );
};
