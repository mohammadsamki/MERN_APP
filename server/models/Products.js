//  cretae new file Products.js
//  this is a model that conatain this schema :prodName, prodImage, prodPrice, prodDescription, prodCategory
//  futures 
// :, prodStock, prodRating, prodReviews
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  prodName: { type: String, required: true },
  prodImage: { type: String, required: true },
  prodPrice: { type: Number, required: true },
  prodDescription: { type: String, required: true },
  prodCategory: { type: String, required: true },
//   prodStock: { type: Number, required: true, default: 0 },
//   prodRating: { type: Number, default: 0 },
//   prodReviews: { type: Number, default: 0 },
}, { timestamps: true });   

module.exports = mongoose.model('Product', productSchema);