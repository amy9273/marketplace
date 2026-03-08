// controllers/productController.js

const fs = require('fs');
const path = require('path');

const categoryPath = path.join(__dirname, '../data/category.json');

// Read category
const getCategories = () => {
  try {
    return JSON.parse(fs.readFileSync(categoryPath, 'utf-8'));
  } catch (err) {
    console.error('Error reading categories:', err);
    return [];
  }
};

// Add this middleware for category ID validation
exports.checkID = (req, res, next, val) => {
  const categories = getCategories();
  const id = parseInt(val);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid category ID format'
    });
  }

  const categoryIndex = categories.findIndex(c => c.id === id);

  if (categoryIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `No category found with ID ${id}`
    });
  }

  req.categories = categories;
  req.categoryIndex = categoryIndex;
  req.category = categories[categoryIndex];

  next();
};

// GET /api/v1/categories
exports.getAllCategories = (req, res) => {
  const categories = getCategories();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: { categories }
  });
};

// GET /api/v1/categories/:id
exports.getCategory = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { category: req.category }
  });
};