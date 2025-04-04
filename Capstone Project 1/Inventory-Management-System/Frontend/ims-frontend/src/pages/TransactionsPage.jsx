import React, { useState, useEffect, useCallback } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  // Pagination Setup
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const fetchTransactions = useCallback(async () => {
    try {
      let response;
      if (selectedDate) {
        response = await ApiService.getTransactionsByDate(selectedDate);
      } else {
        response = await ApiService.getAllTransactions(valueToSearch);
      }

      if (response.status === 200) {
        const transactionsList = response.transactions.map((transaction) => ({
          ...transaction,
          productNames: transaction.productName || "No products",
          productPrice:
            transaction.productPrice !== undefined
              ? `₹${transaction.productPrice}`
              : "N/A",
        }));

        setTotalPages(Math.ceil(transactionsList.length / itemsPerPage));
        setTransactions(
          transactionsList.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      }
    } catch (error) {
      console.error("Error getting transactions:", error);
    }
  }, [valueToSearch, selectedDate, currentPage]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSearch = () => {
    setCurrentPage(1);
    setValueToSearch(filter);
  };

  const navigateToTransactionDetailsPage = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  const downloadCSV = async () => {
    try {
      let transactionData;

      if (selectedDate) {
        transactionData = await ApiService.getTransactionsByDate(selectedDate);
      } else {
        transactionData = await ApiService.getAllTransactions("");
      }

      if (transactionData.status === 200) {
        const transactions = transactionData.transactions;

        let csvContent = "PRODUCT, PRICE, TYPE, STATUS, TOTAL PRODUCTS, TOTAL PRICE, DATE\n";

        transactions.forEach((transaction) => {
          const productNames = transaction.productName || "No products";
          const productPrice = transaction.productPrice !== undefined ? transaction.productPrice : "N/A";
          csvContent += `"${productNames}", "${productPrice}", ${transaction.transactionType}, ${transaction.status}, ${transaction.totalProducts}, ${transaction.totalPrice}, ${new Date(transaction.createdAt).toLocaleString()}\n`;
        });

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `transactions_${selectedDate || "all"}.csv`);
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
            <div className="transaction-date-filter">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="transaction-search">
              <input
                placeholder="Search transaction ..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
              />
              <button onClick={handleSearch}>🔍 Search</button>
            </div>

            <button onClick={downloadCSV}>📥CSV</button>
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
                  <td>
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigateToTransactionDetailsPage(transaction.id)
                      }
                    >
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
