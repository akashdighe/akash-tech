import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productServices";
import { getEnterprises } from "../../services/enterpriseServices";
import ProductModal from "./ProductModal";
import { hasPermission } from "../../utils/roleUtils";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [enterprises, setEnterprises] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data.products && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchEnterprises = async () => {
    const res = await getEnterprises();
    setEnterprises(res);
  };

  useEffect(() => {
    fetchProducts();
    fetchEnterprises();
  }, []);

  const openCreateModal = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleSubmit = async (formData) => {
    if (editProduct) {
      await updateProduct(editProduct._id, formData);
    } else {
      await createProduct(formData);
    }
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        {hasPermission("products", "create") && (
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {products?.map((product) => (
          <div key={product._id} className="border rounded p-4 shadow-sm">
            <img
              // src={product.image}
              src={`http://localhost:5000/${product.image.replace(/\\/g, "/")}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm">{product.details}</p>
            <p className="text-sm">Category: {product.category}</p>
            <p className="text-sm">Price: ${product.price}</p>
            <p className="text-sm">Status: {product.status}</p>
            <p className="text-sm">
              Enterprise: {product.enterprise?.name || "N/A"}
            </p>
            <div className="flex gap-2 mt-3">
              {hasPermission("products", "update") && (
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              {hasPermission("products", "delete") && (
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        productData={editProduct}
        enterprises={enterprises}
      />
    </div>
  );
};
