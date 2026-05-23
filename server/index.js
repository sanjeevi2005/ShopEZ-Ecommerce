import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors({
    origin: ["http://localhost:5173", "https://shop-ez-ecommerce.vercel.app"],
    credentials: true
})); 

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // <-- 2. Link Product Routes
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes); // <-- 3. Link Admin Routes

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
    res.send("Welcome to the ShopEZ API!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});