import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeServices";
import { getEnterprises } from "../../services/enterpriseServices";
import { getRoles } from "../../services/roleServices";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    password: "",
    role: "",
    enterprise: "",
    department: "",
    salary: "",
    status: "",
  });

  const [enterprises, setEnterprises] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getEmployeeById(id);
        setFormData({
          name: data.name,
          username: data.username,
          phoneNumber: data.phoneNumber,
          password: "",
          role: data.role?._id || "",
          enterprise: data.enterprise?._id || "",
          department: data.department,
          salary: data.salary,
          status: data.status,
        });
      }

      const [enterpriseData, roleData] = await Promise.all([
        getEnterprises(),
        getRoles(),
      ]);
      setEnterprises(enterpriseData);
      setRoles(Array.isArray(roleData.data) ? roleData.data : []);
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateEmployee(id, formData);
    } else {
      await createEmployee(formData);
    }
    navigate("/employees");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit" : "Create"} Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name" },
          { label: "Username", name: "username" },
          { label: "Phone Number", name: "phoneNumber" },
          { label: "Password", name: "password", type: "password", hideOnEdit: true },
          { label: "Department", name: "department" },
          { label: "Salary", name: "salary", type: "number" },
          { label: "Status", name: "status" },
        ].map(({ label, name, type = "text", hideOnEdit }) => {
          if (hideOnEdit && id) return null;
          return (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={["name", "username", "password"].includes(name) && !id}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          );
        })}

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Enterprise</label>
          <select
            name="enterprise"
            value={formData.enterprise}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Enterprise</option>
            {enterprises.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
