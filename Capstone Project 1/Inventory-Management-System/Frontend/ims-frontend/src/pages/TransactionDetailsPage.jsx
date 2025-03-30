import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Toast for better error messages
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const TransactionDetailsPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const navigate = useNavigate();

  // ✅ Optimized API call with useCallback
  const fetchTransaction = useCallback(async () => {
    try {
      const response = await ApiService.getTransactionById(transactionId);
      if (response.status === 200) {
        setTransaction(response.transaction);
        setStatus(response.transaction.status);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching transaction!");
    } finally {
      setLoading(false);
    }
  }, [transactionId]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  // ✅ Update transaction status with better error handling
  const handleUpdateStatus = async () => {
    try {
      await ApiService.updateTransactionStatus(transactionId, status);
      toast.success("Transaction status updated successfully!");
      navigate("/transaction");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating transaction!");
    }
  };

  if (loading) {
    return (
      <Layout>
        <p>Loading transaction details...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="transaction-details-page">
        {transaction ? (
          <>
            {/* Transaction Information */}
            <div className="section-card">
              <h2>Transaction Information</h2>
              <p><strong>Type:</strong> {transaction.transactionType || "N/A"}</p>
              <p><strong>Status:</strong> {transaction.status || "N/A"}</p>
              {/* <p><strong>Description:</strong> {transaction.description || "N/A"}</p>
              <p><strong>Note:</strong> {transaction.note || "N/A"}</p> */}
              <p><strong>Total Products:</strong> {transaction.totalProducts || 0}</p>
              <p><strong>Total Price:</strong>  ₹{transaction.totalPrice?.toFixed(2) || "0.00"}</p>
              <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>

              {transaction.updatedAt && (
                <p><strong>Updated At:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>
              )}
            </div>

            {/* Product Information */}
            {transaction.product && (
              <div className="section-card">
                <h2>Product Information</h2>
                <p><strong>Name:</strong> {transaction.product.name || "N/A"}</p>
                <p><strong>SKU:</strong> {transaction.product.sku || "N/A"}</p>
                <p><strong>Price:</strong>  ₹{transaction.product.price?.toFixed(2) || "0.00"}</p>
                <p><strong>Stock Quantity:</strong> {transaction.product.stockQuantity || "N/A"}</p>
                <p><strong>Description:</strong> {transaction.product.description || "N/A"}</p>

                {/* Product Image with Fallback */}
                <img
                  src={transaction.product.imageUrl || "/images/placeholder.png"}
                  alt={transaction.product.name || "No Image Available"}
                  className="product-image"
                  onError={(e) => (e.target.src = "/images/placeholder.png")}
                />
              </div>
            )}

            {/* User Information */}
            {transaction.user && (
              <div className="section-card">
                <h2>User Information</h2>
                <p><strong>Name:</strong> {transaction.user.name || "N/A"}</p>
                <p><strong>Email:</strong> {transaction.user.email || "N/A"}</p>
                <p><strong>Phone Number:</strong> {transaction.user.phoneNumber || "N/A"}</p>
                <p><strong>Role:</strong> {transaction.user.role || "N/A"}</p>
                <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
              </div>
            )}

            {/* Supplier Information */}
            {transaction.supplier && (
              <div className="section-card">
                <h2>Supplier Information</h2>
                <p><strong>Name:</strong> {transaction.supplier.name || "N/A"}</p>
                <p><strong>Contact Address:</strong> {transaction.supplier.contactInfo || "N/A"}</p>
                <p><strong>Address:</strong> {transaction.supplier.address || "N/A"}</p>
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
        ) : (
          <p>Transaction not found.</p>
        )}
      </div>
    </Layout>
  );
};

export default TransactionDetailsPage;
