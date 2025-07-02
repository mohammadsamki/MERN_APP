// routes for Category
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const CategoryController = require('../controllers/categoryControllers');
// Create a new category
router.post('/', adminAuth, CategoryController.createCategory);
// Get all categories
router.get('/', CategoryController.getAllCategories);
// Get a single category by ID
router.get('/:id', CategoryController.getCategoryById);
// Update a category by ID
router.put('/:id', adminAuth, CategoryController.updateCategory);
// Delete a category by ID
router.delete('/:id', adminAuth, CategoryController.deleteCategory);

module.exports = router;
