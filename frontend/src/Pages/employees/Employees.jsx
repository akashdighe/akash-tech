import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../services/employeeServices";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../utils/roleUtils";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employees</h2>
        {hasPermission("employees", "create") && (
          <button
            onClick={() => navigate("/employees/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Enterprise</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Salary</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border">{emp.name}</td>
                  <td className="p-3 border">{emp.username}</td>
                  <td className="p-3 border">{emp.role?.name || "N/A"}</td>
                  <td className="p-3 border">
                    {emp.enterprise?.name || "N/A"}
                  </td>
                  <td className="p-3 border">{emp.department}</td>
                  <td className="p-3 border">${emp.salary}</td>
                  <td className="p-3 border">{emp.status}</td>
                  <td className="p-3 border space-x-2">
                    {hasPermission("employees", "update") && (
                      <button
                        onClick={() => navigate(`/employees/edit/${emp._id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                    {hasPermission("employees", "delete") && (
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
