import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";
import { toast } from "react-toastify"; // ✅ Import Toastify for alerts

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Pagination Setup
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const productData = await ApiService.getAllProducts();

        if (productData.status === 200 && isMounted) {
          setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

          setProducts(productData.products);
          checkExpiry(productData.products); // ✅ Check expiry dates
        }
      } catch (error) {
        showMessage(error.response?.data?.message || "Error Getting Products: " + error);
      }
    };

    getProducts();

    return () => { isMounted = false; };
  }, [currentPage]);

  // ✅ Function to Check Expiry Dates
  const checkExpiry = (products) => {
    const today = new Date();

    products.forEach((product) => {
      if (!product.expiryDate) return; // Skip if no expiry date

      const expiryDate = new Date(product.expiryDate);
      const timeDiff = expiryDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysLeft <= 3) { // 🔴 Mark as Expiring Soon
        toast.error(`⚠️ Expiring Soon: ${product.name} expires in ${daysLeft} days!`);
      }
    });
  };

  // ✅ Delete Product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      try {
        await ApiService.deleteProduct(productId);
        showMessage("Product successfully deleted");
        window.location.reload(); // Reload page
      } catch (error) {
        showMessage(error.response?.data?.message || "Error deleting product: " + error);
      }
    }
  };

  // ✅ Show Message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-page">
        <div className="product-header">
          <h1>Products</h1>
          <button
            className="add-product-btn"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
        </div>

        {products && (
          <div className="product-list">
            {products.map((product) => {
              const isExpiringSoon = product.expiryDate && (new Date(product.expiryDate) - new Date() <= 3 * 24 * 60 * 60 * 1000);
              const isLowStock = product.stockQuantity <= 5;

              return (
                <div
                  key={product.id}
                  className={`product-item ${
                    isExpiringSoon ? "expiring-soon" : isLowStock ? "low-stock" : ""
                  }`}
                >
                  <img
                    className="product-image"
                    src={product.imageUrl}
                    alt={product.name}
                  />

                  <div className="product-info">
                    <h3 className="name">{product.name}</h3>
                    <p className="sku">SKU: {product.sku}</p>
                    <p className="price">Price: ₹{product.price}</p>
                    <p className="quantity">Quantity: {product.stockQuantity}</p>
                    {product.expiryDate && (
                      <p className="expiry-date">Expiry: {product.expiryDate}</p>
                    )}
                  </div>

                  <div className="product-actions">
                    <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default ProductPage;
