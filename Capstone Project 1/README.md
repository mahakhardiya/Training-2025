# 📦 Smart Inventory Management System For Pantry
A sleek and modern inventory management system with a Minimal & Elegant theme.
## 🚀 Overview
The Smart Inventory Management System is a web-based solution designed to streamline inventory tracking, stock management, and transactions efficiently. It features a modern, fully responsive UI with smooth animations and an elegant theme.

---

## **🛠️ Tech Stack**
### **Backend (Spring Boot)**
- **Spring Boot** (REST API)
- **Spring Security** (JWT authentication)
- **Spring Data JPA** (Hibernate)
- **PostgreSQL** (Database)
- **Maven** (Dependency Management)

### **Frontend (React)**
- **React.js** (Component-based UI)
- **React Router** (Navigation)
- **Recharts** (Data Visualization)
- **Toastify** (Notifications)
- **CSS Modules** (Styling)

---

## ⚙️ Features  

✅ **User Authentication & Authorization** (Admin/User roles)  
✅ **CRUD Operations** (Add, update, delete, and view inventory items)  
✅ **Stock Level Alerts** (Low stock notifications)  
✅ **Search & Filter** (Find items quickly)  
✅ **Secure API Access** (JWT-based security) 

---

## 🔐 Authentication & Security
Uses JWT Authentication for secure login/logout.

Role-Based Access Control (RBAC) ensures different permissions for Admin, Manager, and Staff.

Protected API routes with Spring Security.

## 📂 Folder Structure  

```bash
📦 Inventory-Management-System  
 ┣ 📂 Backend (Spring Boot)  
 ┃ ┣ 📂 src/main/java/com/sims  
 ┃ ┃ ┣ 📂 dto           # Data Transfer Objects  
 ┃ ┃ ┣ 📂 enums         # User Roles & Status  
 ┃ ┃ ┣ 📂 models        # Database Entities  
 ┃ ┃ ┣ 📂 repositories  # JPA Repositories  
 ┃ ┃ ┣ 📂 security      # Authentication & Authorization  
 ┃ ┃ ┣ 📂 service       # Business Logic & Services  
 ┃ ┃ ┣ 📂 controllers   # REST API Controllers  
 ┃ ┃ ┣ 📂 config        # App Configuration (CORS, JWT, etc.)  
 ┃ ┃ ┗ 📜 Application.java  # Main entry point  
 ┃ ┣ 📂 resources  
 ┃ ┃ ┣ 📜 application.properties  # Backend Configuration   
 ┃ ┣ 📜 pom.xml         # Maven Dependencies  
 ┃ ┗ 📜 README.md       # Backend Documentation  
 ┣ 📂 Frontend (React)  
 ┃ ┣ 📂 src  
 ┃ ┃ ┣ 📂 component    # Reusable UI Components  
 ┃ ┃ ┣ 📂 pages         # Individual Pages (Dashboard, Login, etc.)  
 ┃ ┃ ┣ 📂 images        # Images, Icons, Fonts  
 ┃ ┃ ┣ 📂 service      # API Calls & Authentication  
 ┃ ┃ ┗ index.css        # CSS & Theme Files
 ┃ ┃ ┗ app.js
 ┃ ┣ 📜 package.json    # Project Dependencies  
 ┃ ┣ 📜 .env            # Environment Variables  
 ┃ ┗ 📜 README.md       # Frontend Documentation  
 ┣ 📜 .gitignore        # Ignored Files  
 ┣ 📜 README.md         # Project Overview  
 ┗ 📜 LICENSE           # License Information  

