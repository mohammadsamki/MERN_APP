require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRouters'); // Uncomment if you have product routes
const categoryRouters = require('./routes/categoryRouters'); // Uncomment if you have category routes
//  import and user cors
const cors = require('cors');

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:3000', // Allow all origins, you can specify specific origins if needed
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    // allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }
)); // Enable CORS for all routes

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static profile images
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Uncomment if you have product routes
app.use('/api/categories', categoryRouters); // Uncomment if you have category routes
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => console.log("🚀 Server running",process.env.PORT));
}).catch(err => console.error("❌ DB error:", err));
