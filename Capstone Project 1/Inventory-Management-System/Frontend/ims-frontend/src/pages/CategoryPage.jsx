import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await ApiService.getAllCategory();
        if (response.status === 200) {
          setCategories(response.categories);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error fetching categories: " + error
        );
      }
    };
    getCategories();
  }, []);

  // Add category
  const addCategory = async () => {
    if (!categoryName.trim()) {
      showMessage("Category name cannot be empty");
      return;
    }
    try {
      await ApiService.createCategory({ name: categoryName });
      showMessage("Category successfully added");
      setCategoryName("");
      window.location.reload();
    } catch (error) {
      showMessage(error.response?.data?.message || "Error adding category: " + error);
    }
  };

  // Edit category
  const editCategory = async () => {
    try {
      await ApiService.updateCategory(editingCategoryId, { name: categoryName });
      showMessage("Category successfully updated");
      setIsEditing(false);
      setCategoryName("");
      window.location.reload();
    } catch (error) {
      showMessage(error.response?.data?.message || "Error updating category: " + error);
    }
  };

  // Populate edit category data
  const handleEditCategory = (category) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await ApiService.deleteCategory(categoryId);
        showMessage("Category successfully deleted");
        window.location.reload();
      } catch (error) {
        showMessage(error.response?.data?.message || "Error deleting category: " + error);
      }
    }
  };

  // Method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      <div className="category-page">
        {/* Display Messages */}
        {message && <div className="message">{message}</div>}

        {/* Category Header */}
        <div className="category-header">
          <h1 className="category-title">Categories</h1>

          {/* Add/Edit Category Input */}
          <div className="add-category-container">
            <input
              value={categoryName}
              type="text"
              className="category-input"
              placeholder="Enter Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            {!isEditing ? (
              <button className="category-button" onClick={addCategory}>Add Category</button>
            ) : (
              <button className="category-button" onClick={editCategory}>Update Category</button>
            )}
          </div>
        </div>

        {/* Category List */}
        {categories && (
          <ul className="category-list">
            {categories.map((category) => (
              <li className="category-item" key={category.id}>
                <span className="category-name">{category.name}</span>

                <div className="category-actions">
                  <button className="edit-button" onClick={() => handleEditCategory(category)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
