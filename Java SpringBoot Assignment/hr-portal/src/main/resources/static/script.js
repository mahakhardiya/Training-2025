const apiBaseUrl = "http://localhost:8080/employees";

// ✅ Function to Close Any Form
function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}

// ✅ Show Add Employee Form
document.getElementById("showAddFormBtn").addEventListener("click", function () {
    document.getElementById("addEmployeeForm").style.display = "block";
});

// ✅ Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("hrLoggedIn"); // Remove login state
    window.location.href = "index.html"; // Redirect to login page
});

// ✅ Close Form Function
function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}

// ✅ Helper function for API requests
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        return response.json();
    } catch (error) {
        console.error("❌ API Error:", error.message);
        alert(`Error: ${error.message}`);
        return null;
    }
}

// ✅ Load Employees on Page Load
async function loadEmployees() {
    const employees = await fetchData(apiBaseUrl);
    if (!employees) return;

    let tableBody = employees.map(emp => `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.email}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="btn" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="btn" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>
    `).join("");

    document.getElementById("employeeBody").innerHTML = tableBody;
}

// ✅ Show Add Employee Form
document.getElementById("showAddFormBtn").addEventListener("click", function () {
    document.getElementById("addEmployeeForm").style.display = "block";
});

// ✅ Add Employee
document.getElementById("addEmployeeForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const department = document.getElementById("department").value.trim();
    const email = document.getElementById("email").value.trim();
    const salary = parseFloat(document.getElementById("salary").value.trim());

    if (!name || !department || !email || isNaN(salary)) {
        alert("❌ Please fill in all fields correctly.");
        return;
    }

    const newEmployee = { name, department, email, salary };
    const result = await fetchData(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee)
    });

    if (result) {
        loadEmployees();
        this.reset();
        this.style.display = "none"; // Hide form after submission
    }
});

// ✅ Delete Employee
// ✅ Delete Employee
async function deleteEmployee(id) {
    if (!id || id === "undefined") {
        alert("❌ Error: Invalid employee ID.");
        return;
    }

    if (confirm("Are you sure you want to delete this employee?")) {
        const response = await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });

        if (response.ok) {
            alert("✅ Employee deleted successfully!");
            loadEmployees(); // Refresh employee list immediately
        } else {
            alert("❌ Error deleting employee. Please try again.");
        }
    }
}

// ✅ Edit Employee (Load Data into Form)
async function editEmployee(id) {
    if (!id || id === "undefined") {
        alert("❌ Error: Invalid employee ID.");
        return;
    }

    const emp = await fetchData(`${apiBaseUrl}/${id}`);
    if (!emp) return;

    document.getElementById("editId").value = emp.id;
    document.getElementById("editName").value = emp.name;
    document.getElementById("editDepartment").value = emp.department;
    document.getElementById("editEmail").value = emp.email;
    document.getElementById("editSalary").value = emp.salary;

    document.getElementById("editEmployeeForm").style.display = "block";
}

// ✅ Update Employee
document.getElementById("editEmployeeForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const empId = document.getElementById("editId").value.trim();
    if (!empId) {
        alert("❌ Error: Employee ID is missing!");
        return;
    }

    const updatedEmployee = {
        name: document.getElementById("editName").value.trim(),
        department: document.getElementById("editDepartment").value.trim(),
        email: document.getElementById("editEmail").value.trim(),
        salary: parseFloat(document.getElementById("editSalary").value.trim()) || 0
    };

    const result = await fetchData(`${apiBaseUrl}/${empId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee)
    });

    if (result) {
        loadEmployees();
        document.getElementById("editEmployeeForm").style.display = "none";
    }
});

// ✅ Load Employees when the page loads
window.onload = loadEmployees;
