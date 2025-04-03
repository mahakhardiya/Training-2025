import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added missing import
import { toast } from "react-toastify"; 
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from "recharts";

const DashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedData, setSelectedData] = useState("amount");
  const [transactionData, setTransactionData] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [expiringSoonAlerts, setExpiringSoonAlerts] = useState([]);
  const navigate = useNavigate(); // ✅ Fix

  const fetchTransactions = useCallback(async () => {
    try {
      const transactionResponse = await ApiService.getAllTransactions();
      if (transactionResponse.status === 200) {
        setTransactionData(
          transformTransactionData(transactionResponse.transactions, selectedMonth, selectedYear)
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching transactions!");
    }
  }, [selectedMonth, selectedYear]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await ApiService.getAllProducts();
      if (response.status === 200) {
        checkLowStock(response.products);
        checkExpiryAlerts(response.products); // ✅ Renamed function
      }
    } catch (error) {
      toast.error("Error fetching products!");
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, [fetchTransactions, fetchProducts]);

  const checkLowStock = (products) => {
    const lowStockItems = products.filter(
      (product) => product.stockQuantity !== undefined && product.stockQuantity <= (product.lowStockThreshold || 5)
    );
    lowStockItems.forEach((product) => {
      toast.warn(`⚠️ Low Stock: ${product.name} has only ${product.stockQuantity} left!`);
    });
    setLowStockAlerts(lowStockItems);
  };

  const checkExpiryAlerts = (products) => {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
  
    const expiringItems = products.filter((product) =>
      product.expiryDate &&
      new Date(product.expiryDate) > today &&
      new Date(product.expiryDate) <= sevenDaysLater
    );
  
    setExpiringSoonAlerts(expiringItems);
  };
  

  const handleRestock = (product) => {
    navigate("/purchase", { state: { productId: product.id } });
  };

  const transformTransactionData = (transactions, month, year) => {
    const dailyData = {};
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dailyData[day] = { day, count: 0, quantity: 0, amount: 0 };
    }

    transactions.forEach((transaction) => {
      if (!transaction.createdAt) return; // ✅ Prevents crash if createdAt is missing
      const transactionDate = new Date(transaction.createdAt);
      if (transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year) {
        const day = transactionDate.getDate();
        dailyData[day].count += 1;
        dailyData[day].quantity += transaction.totalProducts;
        dailyData[day].amount += transaction.totalPrice;
      }
    });

    return Object.values(dailyData);
  };

  // ✅ Prepare Data for Recharts
  const chartData = [
    { name: "Low Stock", count: lowStockAlerts.length },
    { name: "Expiring Soon", count: expiringSoonAlerts.length },
  ];

  return (
    <Layout>
      <div className="dashboard-page">
        <div className="dashboard-content">
          <div className="alert-section">
            <h3>⚠️ Low Stock Alerts</h3>
            {lowStockAlerts.length > 0 ? (
              lowStockAlerts.map((product) => (
                <div key={product.id} className="alert-card">
                  <span>
                    {product.name} - {product.stockQuantity} left
                  </span>
                  <button onClick={() => handleRestock(product)}>Restock</button>
                </div>
              ))
            ) : (
              <p>No low stock items.</p>
            )}
          </div>

          <div className="alert-section">
            <h3>⏳ Expiring Soon</h3>
            {expiringSoonAlerts.length > 0 ? (
              expiringSoonAlerts.map((product) => (
                <div key={product.id} className="alert-card expiring">
                  <span>
                    {product.name} - Expires on{" "}
                    {new Date(product.expiryDate).toDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No expiring soon items.</p>
            )}
          </div>

          {/* Recharts Visualization */}
        <div className="chart-container-2">
          <h3>📊 Inventory Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FF5733" barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>

          <div className="filter-section">
            <label htmlFor="month-select">Select Month:</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <label htmlFor="year-select">Select Year:</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="chart-section">
            <div className="chart-container">
              <h3>Daily Transactions</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={selectedData} stroke="#3E2723" fillOpacity={0.3} fill="#C6A87D" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="button-group">
            <button onClick={() => setSelectedData("count")}>Order Volume</button>
            <button onClick={() => setSelectedData("quantity")}>Inventory Levels</button>
            <button onClick={() => setSelectedData("amount")}>Sales Summary</button>
          </div>
        </div>
    </Layout>
  );
};

export default DashboardPage;
