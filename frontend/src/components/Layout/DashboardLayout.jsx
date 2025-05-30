import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const permissionsUser = auth?.user?.role?.permissions;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        permissions={permissionsUser || {}}
      />
      {/* Main area */}
      <div className="flex flex-col flex-1 w-0">
        {/* Navbar */}
        <Navbar onHamburgerClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
