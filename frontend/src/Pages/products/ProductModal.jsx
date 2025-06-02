import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProductModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  productData,
  enterprises,
}) => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    details: "",
    category: "",
    price: "",
    status: "",
    enterprise: "",
  });

  useEffect(() => {
    if (productData) {
      setForm({
        name: productData.name || "",
        image: "",
        details: productData.details || "",
        category: productData.category || "",
        price: productData.price || "",
        status: productData.status || "",
        enterprise: productData.enterprise?._id || "",
      });
    } else {
      setForm({
        name: "",
        image: "",
        details: "",
        category: "",
        price: "",
        status: "",
        enterprise: "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (form[key]) formData.append(key, form[key]);
    }
    onSubmit(formData);
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
        {productData ? "Edit Product" : "Create Product"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          accept="image/*"
          required={!productData}
        />
        <textarea
          name="details"
          placeholder="Details"
          value={form.details}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="enterprise"
          value={form.enterprise}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Enterprise</option>
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
            {productData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
