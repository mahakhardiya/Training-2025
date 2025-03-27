# 📦 Smart Inventory Management System ☕🍪
A sleek and modern inventory management system with a Minimal & Elegant (Beige & Coffee) theme.
## 🚀 Overview
The Smart Inventory Management System is a web-based solution designed to streamline inventory tracking, stock management, and transactions efficiently. It features a modern, fully responsive UI with smooth animations and an elegant café-inspired theme.

---

## 🛠️ Tech Stack  

### **Backend** (Completed ✅)  
- **Spring Boot** – RESTful APIs for managing inventory  
- **Spring Security** – User authentication & authorization  
- **PostgreSQL** – Database for storing inventory data  
- **JWT (JSON Web Token)** – Secure authentication  

### **Frontend** (In Progress 🚧)  
- **React (with hooks & context API)** – User interface  
- **Axios** – Consuming backend services  
- **CSS (Custom Theme: Beige & Coffee ☕🍪)** – Styling and responsiveness  

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
📦 Capstone Project 1
 ┣ 📂 backend (Spring Boot)
 ┃ ┣ 📂 src/main/java/com/sims
 ┃ ┃ ┣ 📂 dto (Data Transfer Objects)
 ┃ ┃ ┣ 📂 enums (User Roles)
 ┃ ┃ ┣ 📂 models (Database entities)
 ┃ ┃ ┣ 📂 repositories (JPA Repositories)
 ┃ ┃ ┣ 📂 security (Authentication & Authorization)
 ┃ ┃ ┣ 📂 service (Business logic)
 ┃ ┃ ┣ 📂 controllers (REST APIs)
 ┃ ┃ ┣ 📂 config (Configuration)
 ┃ ┃ ┗ 📜 Application.java (Main entry point)
 ┃ ┣ 📂 resources (Configurations)
 ┣ 📜 README.md
