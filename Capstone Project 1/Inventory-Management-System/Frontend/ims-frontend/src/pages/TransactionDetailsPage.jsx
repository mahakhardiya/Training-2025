import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const TransactionDetailsPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const transactionData = await ApiService.getTransactionById(transactionId);

        if (transactionData.status === 200) {
          setTransaction(transactionData.transaction);
          setStatus(transactionData.transaction.status);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error fetching transaction: " + error
        );
      }
    };

    getTransaction();
  }, [transactionId]);

  // Update transaction status
  const handleUpdateStatus = async () => {
    try {
      await ApiService.updateTransactionStatus(transactionId, status);
      navigate("/transaction");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error updating transaction: " + error
      );
    }
  };

  // Show message function
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <p className="message">{message}</p>}
      <div className="transaction-details-page">
        {transaction && (
          <>
            {/* Transaction Base Information */}
            <div className="section-card">
              <h2>Transaction Information</h2>
              <p><strong>Type:</strong> {transaction.transactionType}</p>
              <p><strong>Status:</strong> {transaction.status}</p>
              <p><strong>Description:</strong> {transaction.description || "N/A"}</p>
              <p><strong>Note:</strong> {transaction.note || "N/A"}</p>
              <p><strong>Total Products:</strong> {transaction.totalProducts}</p>
              <p><strong>Total Price:</strong> {transaction.totalPrice ? transaction.totalPrice.toFixed(2) : "0.00"}</p>
              <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>

              {transaction.updatedAt && (
                <p><strong>Updated At:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>
              )}
            </div>

            {/* Product Information */}
            <div className="section-card">
              <h2>Product Information</h2>
              <p><strong>Name:</strong> {transaction.product?.name || "N/A"}</p>
              <p><strong>SKU:</strong> {transaction.product?.sku || "N/A"}</p>
              <p><strong>Price:</strong> {transaction.product?.price ? transaction.product.price.toFixed(2) : "0.00"}</p>
              <p><strong>Stock Quantity:</strong> {transaction.product?.stockQuantity || "N/A"}</p>
              <p><strong>Description:</strong> {transaction.product?.description || "N/A"}</p>

              {/* Product Image with Fallback */}
              {transaction.product?.imageUrl ? (
                <img
                  src={transaction.product.imageUrl}
                  alt={transaction.product.name}
                  className="product-image"
                  onError={(e) => e.target.src = "/images/placeholder.png"}
                />
              ) : (
                <img
                  src="/images/placeholder.png"
                  alt="No Image Available"
                  className="product-image"
                />
              )}
            </div>

            {/* User Information */}
            <div className="section-card">
              <h2>User Information</h2>
              <p><strong>Name:</strong> {transaction.user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {transaction.user?.email || "N/A"}</p>
              <p><strong>Phone Number:</strong> {transaction.user?.phoneNumber || "N/A"}</p>
              <p><strong>Role:</strong> {transaction.user?.role || "N/A"}</p>
              <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
            </div>

            {/* Supplier Information */}
            {transaction.supplier && (
              <div className="section-card">
                <h2>Supplier Information</h2>
                <p><strong>Name:</strong> {transaction.supplier?.name || "N/A"}</p>
                <p><strong>Contact Address:</strong> {transaction.supplier?.contactInfo || "N/A"}</p>
                <p><strong>Address:</strong> {transaction.supplier?.address || "N/A"}</p>
              </div>
            )}

            {/* Update Transaction Status */}
            <div className="section-card transaction-status-update">
              <label><strong>Status:</strong></label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              <button onClick={handleUpdateStatus}>Update Status</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default TransactionDetailsPage;
