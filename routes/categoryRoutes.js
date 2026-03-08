const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Category routes
router.param('id', categoryController.checkID); // Add category param

// Category routes
router.route('/')
  .get(categoryController.getAllCategories);

router.route('/:id')
  .get(categoryController.getCategory);
  
module.exports = router;