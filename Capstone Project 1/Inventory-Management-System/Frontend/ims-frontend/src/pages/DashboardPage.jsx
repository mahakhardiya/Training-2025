import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify"; // ✅ Import toast for notifications
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedData, setSelectedData] = useState("amount");
  const [transactionData, setTransactionData] = useState([]);

  // ✅ Optimized fetchTransactions using useCallback
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

  // ✅ Optimized fetchProducts using useCallback
  const fetchProducts = useCallback(async () => {
    try {
      const response = await ApiService.getAllProducts();
      if (response.status === 200) {
        checkLowStock(response.products);
        checkExpiry(response.products);
      }
    } catch (error) {
      toast.error("Error fetching products!");
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, [fetchTransactions, fetchProducts]); // ✅ Now, no warning!

  // ✅ Check for Low Stock Products (Handles undefined values)
  const checkLowStock = (products) => {
    const lowStockItems = products.filter(
      (product) => product.stockQuantity !== undefined && product.stockQuantity <= (product.lowStockThreshold || 5) // Default 5 if undefined
    );
    lowStockItems.forEach((product) => {
      toast.warn(`⚠️ Low Stock: ${product.name} has only ${product.stockQuantity} left!`);
    });
  };

  // ✅ Check for Expired Products (Handles missing expiryDate)
  const checkExpiry = (products) => {
    const today = new Date();
    const expiredItems = products.filter(
      (product) => product.expiryDate && new Date(product.expiryDate) < today
    );
    expiredItems.forEach((product) => {
      toast.error(`❌ Expired: ${product.name} expired on ${new Date(product.expiryDate).toDateString()}!`);
    });
  };

  // ✅ Transform transaction data for the chart
  const transformTransactionData = (transactions, month, year) => {
    const dailyData = {};
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dailyData[day] = { day, count: 0, quantity: 0, amount: 0 };
    }

    transactions.forEach((transaction) => {
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

  return (
    <Layout>
      <div className="dashboard-page">

        <div className="dashboard-content">
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

          {/* Display the chart */}
          <div className="chart-section">
            <div className="chart-container">
              <h3>Daily Transactions</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: "Day", position: "insideBottomRight", offset: -5 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={selectedData} stroke="#3E2723" fillOpacity={0.3} fill="#C6A87D" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="button-group">
            <br /><br />
          <button onClick={() => setSelectedData("count")}>Order Volume</button>
          <button onClick={() => setSelectedData("quantity")}>Inventory Levels</button>
          <button onClick={() => setSelectedData("amount")}>Sales Summary</button>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
