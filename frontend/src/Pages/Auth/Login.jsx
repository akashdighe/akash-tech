import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(form);
      login(data.token, data.user);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col items-center">
          {/* Placeholder for Logo */}
          <div className="w-16 h-16 bg-[#2c457b] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md">
            EMS
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Enterprise Management System
          </h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-600 text-center text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2c457b] cursor-pointer hover:bg-[#455579] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Enterprise Management System. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
