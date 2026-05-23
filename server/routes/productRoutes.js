import express from 'express';
import { addProduct, getAllProducts } from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/add', upload.single('image'), addProduct);
router.get('/', getAllProducts);

export default router;