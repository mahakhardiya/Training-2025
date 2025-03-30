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

        if (transactionData.status === 200) {
          setTotalPages(Math.ceil(transactionData.transactions.length / itemsPerPage));
          setTransactions(
            transactionData.transactions.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting transactions: " + error
        );
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
      // Fetch all transactions (without pagination)
      const transactionData = await ApiService.getAllTransactions("");

      if (transactionData.status === 200) {
        const transactions = transactionData.transactions;

        // Define CSV header
        let csvContent = "TYPE,STATUS,TOTAL PRICE,TOTAL PRODUCTS,DATE\n";

        // Append each transaction row
        transactions.forEach((transaction) => {
          csvContent += `${transaction.transactionType},${transaction.status},${transaction.totalPrice},${transaction.totalProducts},${new Date(transaction.createdAt).toLocaleString()}\n`;
        });

        // Create a Blob and trigger download
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
        {/* Transactions Header */}
        <div className="transactions-header">
          <h1>Transactions</h1>
          <div className="transaction-actions">
            {/* Search Bar */}
            <div className="transaction-search">
              <input
                placeholder="Search transaction ..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
              />
              <button onClick={handleSearch}>🔍 Search</button>
            </div>
            {/* CSV Download Button */}
            <button onClick={downloadCSV}>📥 Download CSV</button>
          </div>
        </div>

        {/* Transactions Table */}
        {transactions.length > 0 ? (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>TOTAL PRICE</th>
                <th>TOTAL PRODUCTS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.totalPrice}</td>
                  <td>{transaction.totalProducts}</td>
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

      {/* Pagination Component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default TransactionsPage;
