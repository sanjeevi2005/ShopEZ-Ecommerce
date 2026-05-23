import { User } from '../models/Schema.js';

export const register = async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);
        const { username, email, password, usertype } = req.body; 

        if (!username || !email || !password || !usertype) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Schema-la 'usertype' nu field irukku, so adhaiye use pannuvom
        const newUser = new User({ username, email, password, usertype });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(404).json({ message: "Invalid credentials" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};