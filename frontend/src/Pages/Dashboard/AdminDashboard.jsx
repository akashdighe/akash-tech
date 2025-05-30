import React from "react";
import { FaUsers, FaBuilding, FaUserTie, FaBox, FaClock } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockStats = {
  users: 102,
  enterprises: 18,
  employees: 215,
  products: 67,
};

const activityLogs = [
  { id: 1, activity: "User John created a new product." },
  { id: 2, activity: "Enterprise ABC Corp was added." },
  { id: 3, activity: "Employee record updated by Admin." },
  { id: 4, activity: "Product SKU-2023 was deleted." },
];

const barChartData = [
  { name: "Employees", value: mockStats.employees },
  { name: "Products", value: mockStats.products },
];

export const AdminDashboard = () => {
  return (
    <div className="p-6">
      {/* Welcome Header */}
      <h1 className="text-2xl font-semibold mb-2">Welcome to your Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Role: <span className="font-medium text-blue-600">Admin</span>
      </p>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Widget
          title="Total Users"
          count={mockStats.users}
          icon={<FaUsers />}
          color="blue"
        />
        <Widget
          title="Enterprises"
          count={mockStats.enterprises}
          icon={<FaBuilding />}
          color="green"
        />
        <Widget
          title="Employees"
          count={mockStats.employees}
          icon={<FaUserTie />}
          color="yellow"
        />
        <Widget
          title="Products"
          count={mockStats.products}
          icon={<FaBox />}
          color="purple"
        />
      </div>

      {/* Chart & Logs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-md rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Overview Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-4 shadow-md rounded-2xl">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaClock className="text-gray-500" /> Recent Activities
          </h2>
          <ul className="space-y-3">
            {activityLogs.map((log) => (
              <li key={log.id} className="text-gray-700 border-b pb-2">
                • {log.activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Widget = ({ title, count, icon, color }) => {
  const bg = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4">
      <div className={`${bg[color]} p-3 rounded-full`}>{icon}</div>
      <div>
        <p className="text-gray-600">{title}</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
};
