const Cart = require('../models/Cart');
//  add to cart controller
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
    let cart = await Cart.findOne({user: req.user});

         if(!cart){
        cart = new Cart({ user:req.user,items:[]})
    }
    const exitedItems = cart.items.find(item => item.product.toString() === productId);
    if(exitedItems){
        exitedItems.quantity += quantity;
    }
    else {
        cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully', cart });
        
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
        
    }
   
}
//  get cart controller
exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user }).populate('items.product');
    res.status(200).json(cart || { message: 'Cart is empty' });
}
//  remove from cart controller
exports.removeFromCart = async (req, res) => {
    const {productId} = req.params;
    try {
        const cart = await Cart.findOne({ user: req.user });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart successfully', cart });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}