//  create routs for the prod the get without auth and the post with auth
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', adminAuth, productController.createProduct);
router.put('/:id', adminAuth, productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);

module.exports = router;