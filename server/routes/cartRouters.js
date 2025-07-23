const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

// Routes
router.post('/add-to-cart', auth, cartController.addToCart);
router.get('/get-cart', auth, cartController.getCart);
router.delete('/remove-from-cart/:productId', auth, cartController.removeFromCart);
module.exports = router;