import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  const navigate = useNavigate();

  // Pagination Setup
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactionData = await ApiService.getAllTransactions(valueToSearch);
        console.log("API Response:", transactionData); // ✅ Debugging log

        if (transactionData.status === 200) {
          const transactionsList = transactionData.transactions.map(transaction => ({
            ...transaction,
            productNames: transaction.productName ? transaction.productName : "No products",
            productPrice: transaction.productPrice !== undefined ? `₹${transaction.productPrice}` : "N/A"
          }));

          console.log("Processed Transactions:", transactionsList); // ✅ Check if productPrice is included

          setTotalPages(Math.ceil(transactionsList.length / itemsPerPage));
          setTransactions(
            transactionsList.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        console.error("Error Getting transactions:", error);
      }
    };

    getTransactions();
  }, [currentPage, valueToSearch]);

  // Method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    setValueToSearch(filter);
  };

  // Navigate to transactions details page
  const navigateToTransactionDetailsPage = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  // Function to download transactions as CSV
  const downloadCSV = async () => {
    try {
      const transactionData = await ApiService.getAllTransactions("");

      if (transactionData.status === 200) {
        const transactions = transactionData.transactions;

        let csvContent = "PRODUCT, PRICE, TYPE, STATUS, TOTAL PRODUCTS, TOTAL PRICE, DATE\n";

        transactions.forEach((transaction) => {
          const productNames = transaction.productName || "No products";
          const productPrice = transaction.productPrice !== undefined ? transaction.productPrice : "N/A";
          csvContent += `"${productNames}", "${productPrice}", ${transaction.transactionType},${transaction.status},${transaction.totalProducts},${transaction.totalPrice},${new Date(transaction.createdAt).toLocaleString()}\n`;
        });

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `transactions_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      showMessage("Error downloading CSV: " + error.message);
    }
  };

  return (
    <Layout>
      {message && <p className="message">{message}</p>}

      <div className="transactions-page">
        <div className="transactions-header">
          <h1>Transactions</h1>
          <div className="transaction-actions">
            <div className="transaction-search">
              <input
                placeholder="Search transaction ..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
              />
              <button onClick={handleSearch}>🔍 Search</button>
            </div>
            <button onClick={downloadCSV}>📥 Download CSV</button>
          </div>
        </div>

        {transactions.length > 0 ? (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>TOTAL PRODUCTS</th>
                <th>TOTAL PRICE</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.productNames}</td>
                  <td className="product-price">{transaction.productPrice}</td>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.totalProducts}</td>
                  <td>{transaction.totalPrice}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => navigateToTransactionDetailsPage(transaction.id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
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

export default TransactionsPage;
