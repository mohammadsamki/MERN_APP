const Orders = require('../models/Orders');
const Cart = require('../models/Cart');


exports.placeOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user }).populate('items.product');
    if (!cart){
        return res.status(400).json({ message: 'Cart not found' });
    }
    const total =cart.items.reduce((sum,item)=>sum + parseInt(item.product.prodPrice) * item.quantity,0);
    console.log("Total price of the order:", total);
    const order = new Orders({
        user:req.user,
        items:cart.items.map(item=>({
            product: item.product._id,
            quantity: item.quantity
        })),
        total,
        status: 'completed'
    })
    await order.save();
    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ user: req.user });
    res.status(201).json({ message: 'Order placed successfully', order });
}
// get all orders controller
exports.getAllOrders = async (req, res) => {
    const orders = await Orders.find({ user: req.user }).populate(['items.product', 'user']);
    res.status(200).json(orders);
}