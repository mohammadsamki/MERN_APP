const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const cartController = require('../controllers/orderController');
// Routes for Order
router.post('/place-order', auth, cartController.placeOrder);
router.get('/get-all-orders', auth, cartController.getAllOrders);

module.exports = router;