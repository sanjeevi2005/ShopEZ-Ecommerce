import express from 'express';
import { placeOrder, getOrdersByUser } from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder);

// The :userId here is crucial for the frontend to pass the ID
router.get('/user/:userId', getOrdersByUser);

export default router;