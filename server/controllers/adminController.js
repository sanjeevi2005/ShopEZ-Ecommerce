// server/controllers/adminController.js
import { User, Product, Orders } from '../models/Schema.js'; // Check your Schema path

export const getDashboardStats = async (req, res) => {
    try {
        // 1. Get Basic Counts
        const totalUsers = await User.countDocuments({ usertype: 'Customer' });
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Orders.countDocuments();

        // 2. Send data to frontend
        res.status(200).json({
            users: totalUsers,
            products: totalProducts,
            orders: totalOrders
        });
    } catch (error) {
        console.error("Stats Error:", error.message);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
};

// Database-la irukkira ella orders-aiyum edukka
export const getAllOrders = async (req, res) => {
    try {
        // latest orders modhalla vara sort panrom
        const orders = await Orders.find().sort({ createdAt: -1 }); 
        res.status(200).json(orders);
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// Order status-ah update panna
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Orders.findByIdAndUpdate(
            id, 
            { orderStatus: status }, 
            { new: true }
        );

        res.status(200).json({ message: "Order status updated!", order: updatedOrder });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ message: "Failed to update order status" });
    }
};