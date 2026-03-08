// modules/replaceTemplate.js
const fs = require('fs');
const path = require('path');

// Read categories data once when module loads
const categories = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/category.json'), 'utf-8')
);

// Helper function to get category name by ID
const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown Category';
};

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%NAME%}/g, product.name);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%CATEGORY%}/g, getCategoryName(product.category));
  output = output.replace(/{%SELLER%}/g, product.seller || '');
  output = output.replace(/{%DESCRIPTION%}/g, product.description || '');
  return output;
};

module.exports = replaceTemplate;