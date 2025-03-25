# 📦 Inventory Management System for Pantry

## 📝 Project Overview  
The **Inventory Management System for Pantry** is designed to efficiently track and manage pantry stock. It helps users monitor available items, receive alerts for low stock, and manage inventory updates with ease.  

---

## 🛠️ Tech Stack  

### **Backend** (Completed ✅)  
- **Spring Boot** – RESTful APIs for managing inventory  
- **Spring Security** – User authentication & authorization  
- **PostgreSQL** – Database for storing inventory data  
- **JWT (JSON Web Token)** – Secure authentication  

### **Frontend** (In Progress 🚧)  
- **HTML, CSS, JavaScript** – User interface  
- **Fetch API / Axios** – Consuming backend services  
- **Bootstrap / Tailwind CSS** – Styling and responsiveness  

---

## ⚙️ Features  

✅ **User Authentication & Authorization** (Admin/User roles)  
✅ **CRUD Operations** (Add, update, delete, and view inventory items)  
✅ **Stock Level Alerts** (Low stock notifications)  
✅ **Search & Filter** (Find items quickly)  
✅ **Secure API Access** (JWT-based security) 

---

## 📂 Folder Structure  

```bash
📦 Inventory-Management-System
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
 ┣ 📂 frontend (HTML, CSS, JS) --- in progress
 ┃ ┣ 📜 index.html (Dashboard UI)
 ┃ ┣ 📜 inventory.js (API calls)
 ┃ ┣ 📜 styles.css (Styling)
 ┣ 📜 README.md
