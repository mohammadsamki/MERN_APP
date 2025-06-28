//  add creud operations for products
const Product = require('../models/Products');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { prodName, prodImage, prodPrice, prodDescription, prodCategory } = req.body;
    const newProduct = new Product({
      prodName,
      prodImage,
      prodPrice,
      prodDescription,
      prodCategory
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
}
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}
// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
}
// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { prodName, prodImage, prodPrice, prodDescription, prodCategory } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { prodName, prodImage, prodPrice, prodDescription, prodCategory },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }     
}
// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
    }