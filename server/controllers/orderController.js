import { Orders } from '../models/Schema.js'; 

export const placeOrder = async (req, res) => {
    try {
        // Schema-la export 'Orders' nu irukku, so adhai use pannanum
        const newOrder = new Orders(req.body); 
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Orders.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};