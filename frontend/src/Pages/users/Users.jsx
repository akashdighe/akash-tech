import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  resetPassword,
} from "../../services/userServices";
import UserModal from "./UserModal";
import { getRoles } from "../../services/roleServices";
import { getEnterprises } from "../../services/enterpriseServices";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [enterprises, setEnterprises] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const fetchMetaData = async () => {
    const [roleRes, entRes] = await Promise.all([getRoles(), getEnterprises()]);

    setRoles(roleRes.data);
    setEnterprises(entRes.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchMetaData();
  }, []);

  const openCreateModal = () => {
    setEditUser(null);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const handleReset = async (id) => {
    const password = prompt("Enter new password:");
    if (password) {
      await resetPassword(id, password);
      alert("Password reset.");
    }
  };

  const handleSubmit = async (formData) => {
    if (editUser) {
      await updateUser(editUser._id, formData);
    } else {
      await createUser(formData);
    }
    fetchUsers();
  };

  return (
    <div className="p-6">
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">name</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">PhoneNumber</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Enterprise</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.phoneNumber}</td>
                <td className="border p-2">{user.role?.name}</td>
                <td className="border p-2">{user.enterprise?.name || "-"}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleReset(user._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        userData={editUser}
        roles={roles}
        enterprises={enterprises}
      />
    </div>
  );
};
