import React, { useEffect, useState } from "react";
import {
  getEnterprises,
  deleteEnterprise,
} from "../../services/enterpriseServices";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../utils/roleUtils";

const Enterprises = () => {
  const [enterprises, setEnterprises] = useState([]);
  const navigate = useNavigate();

  const fetchEnterprises = async () => {
    const data = await getEnterprises();
    setEnterprises(Array.isArray(data) ? data : []);
  };
  // console.log(data);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enterprise?")) {
      await deleteEnterprise(id);
      fetchEnterprises();
    }
  };

  useEffect(() => {
    fetchEnterprises();
  }, []);

  return (
    <div className="">
      <div className="flex justify-end items-center ">
        {hasPermission("products", "create") && (
          <button
            onClick={() => navigate("/enterprises/create")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Enterprise
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {enterprises.map((ent) => (
          <div
            key={ent._id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-lg font-semibold">{ent.name}</h3>
              <p className="text-gray-600">📍 {ent.location || "N/A"}</p>
              <p className="text-gray-600">📞 {ent.contactInfo || "N/A"}</p>
            </div>

            <div className="flex gap-2 mt-4">
              {hasPermission("enterprises", "update") && (
                <button
                  onClick={() => navigate(`/enterprises/edit/${ent._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              {hasPermission("products", "delete") && (
                <button
                  onClick={() => handleDelete(ent._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enterprises;
