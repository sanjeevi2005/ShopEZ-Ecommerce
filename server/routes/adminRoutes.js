// server/routes/adminRoutes.js
import express from 'express';
import { getDashboardStats, getAllOrders, updateOrderStatus } from '../controllers/adminController.js';

const router = express.Router();

// Admin Dashboard Stats
router.get('/stats', getDashboardStats);
// Admin Orders Management
router.get('/orders', getAllOrders);
// Update order status (e.g., pending, shipped, delivered)
router.put('/orders/:id/status', updateOrderStatus);

export default router;