import { Product } from '../models/Schema.js';

// --- ADD A NEW PRODUCT ---
export const addProduct = async (req, res) => {
    try {
        const { title, description, price, category, sizes, gender } = req.body;

        // Image file varalai na error
        if (!req.file) {
            return res.status(400).json({ message: "Product image is required!" });
        }

        // Database path
        const imagePath = `/images/${req.file.filename}`;

        const newProduct = new Product({
            title,
            description,
            price,
            category,
            sizes: sizes ? sizes.split(',') : [], // 'M,L' -> ['M', 'L']
            gender,
            mainImg: imagePath,
            usertype: 'Admin'
        });

        await newProduct.save();

        res.status(201).json({ 
            message: "Product added successfully!", 
            product: newProduct 
        });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ message: "Failed to add product" });
    }
};

// --- GET ALL PRODUCTS ---
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json(products);
    } catch (error) {
        console.error("🚨 Fetch Products Error:", error);
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};