import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEnterprise,
  getEnterpriseById,
  updateEnterprise,
} from "../../services/enterpriseServices";
import { MdKeyboardBackspace } from "react-icons/md";

const EnterpriseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contactInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEnterpriseById(id).then((data) => setFormData(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateEnterprise(id, formData);
      } else {
        await createEnterprise(formData);
      }
      navigate("/enterprises");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <MdKeyboardBackspace  />
      </div>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Enterprise" : "Create Enterprise"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enterprise Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
          />
          <input
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Contact Info"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterpriseForm;
