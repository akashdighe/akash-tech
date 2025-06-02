import React, { useEffect, useState } from "react";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../services/roleServices"; // your API services here
import RoleModal from "./RoleModal";
import { hasPermission } from "../../utils/roleUtils";

export const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch roles from API
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await getRoles();
      setRoles(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      alert("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await deleteRole(id);
        fetchRoles();
      } catch {
        alert("Delete failed");
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedRole) {
        await updateRole(selectedRole._id, formData);
      } else {
        await createRole(formData);
      }
      setModalOpen(false);
      fetchRoles();
    } catch {
      alert("Save failed");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-7xl mx-auto">
      <div className="flex justify-end items-center mb-5">
        {hasPermission("roles", "create") && (
          <button
            onClick={openCreateModal}
            className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded"
          >
            + Add Role
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading roles...</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Role Name</th>
              <th className="border p-3 text-left">Permissions</th>
              {(hasPermission("roles", "update") ||
                hasPermission("roles", "delete")) && (
                <th className="border p-3 text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-500">
                  No roles found.
                </td>
              </tr>
            )}

            {roles.map((role) => (
              <tr key={role._id} className="hover:bg-gray-50">
                <td className="border p-3 font-medium">{role.name}</td>
                <td className="border p-3 text-sm max-w-xl">
                  {role.permissions.map((p) => {
                    const perms = ["create", "read", "update", "delete"]
                      .filter((action) => p[action])
                      .join(", ");
                    return (
                      <div key={p._id || p.module}>
                        <strong className="capitalize">{p.module}:</strong>{" "}
                        {perms}
                      </div>
                    );
                  })}
                </td>

                {(hasPermission("roles", "update") || hasPermission("roles", "delete")) && (
                <td className="border p-3 space-x-3">
                  {hasPermission("roles", "update") && (
                    <button
                      onClick={() => openEditModal(role)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  {hasPermission("roles", "delete") && (
                    <button
                      onClick={() => handleDelete(role._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Role Modal */}
      <RoleModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedRole}
      />
    </div>
  );
};
