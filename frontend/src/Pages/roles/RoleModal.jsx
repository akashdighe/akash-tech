import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const modulesList = [
  "dashboard",
  "roles",
  "products",
  "productSale",
  "users",
  "employees",
  "enterprises",
];

const actions = ["create", "read", "update", "delete"];

const RoleModal = ({ isOpen, onRequestClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: "", permissions: [] });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        permissions: modulesList.map((module) => {
          const found = initialData.permissions.find((p) => p.module === module);
          return {
            module,
            create: found?.create || false,
            read: found?.read || false,
            update: found?.update || false,
            delete: found?.delete || false,
          };
        }),
      });
    } else {
      setForm({
        name: "",
        permissions: modulesList.map((module) => ({
          module,
          create: false,
          read: false,
          update: false,
          delete: false,
        })),
      });
    }
  }, [initialData]);

  const handlePermissionToggle = (module, action) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.map((p) =>
        p.module === module ? { ...p, [action]: !p[action] } : p
      ),
    }));
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
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-10 px-4 z-50"
      className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6"
    >
      <h2 className="text-xl font-bold mb-6">
        {initialData ? "Edit Role" : "Create Role"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role name input */}
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter role name"
            required
          />
        </div>

        {/* Permissions table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Permissions</h3>
          <div className="overflow-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left border">Module</th>
                  {actions.map((action) => (
                    <th
                      key={action}
                      className="p-2 text-center capitalize border"
                    >
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {form.permissions.map((perm, idx) => (
                  <tr key={idx} className="even:bg-gray-50">
                    <td className="p-2 border font-medium">{perm.module}</td>
                    {actions.map((action) => (
                      <td key={action} className="p-2 border text-center">
                        <input
                          type="checkbox"
                          checked={perm[action]}
                          onChange={() =>
                            handlePermissionToggle(perm.module, action)
                          }
                          className="w-4 h-4"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {initialData ? "Update Role" : "Create Role"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoleModal;
