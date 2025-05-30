import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  userData,
  roles,
  enterprises,
}) => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    password: "",
    roleId: "",
    enterpriseId: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        username: userData.username || "",
        name: userData.name || "",
        phoneNumber: userData.phoneNumber || "",
        password: "", // Blank on edit
        roleId: userData.role?._id || "",
        enterpriseId: userData.enterprise?._id || "",
      });
    } else {
      setForm({
        username: "",
        name: "",
        phoneNumber: "",
        password: "",
        roleId: "",
        enterpriseId: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
      className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4">
        {userData ? "Edit User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {!userData && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        )}
        <select
          name="roleId"
          value={form.roleId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        <select
          name="enterpriseId"
          value={form.enterpriseId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Enterprise (optional)</option>
          {enterprises.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {userData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
