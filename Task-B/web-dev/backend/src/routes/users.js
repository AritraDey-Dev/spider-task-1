import express from "express";
import { User } from "../models/Schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = express.Router();

const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
});

router.post('/signup', async (req, res) => {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ msg: validation.error.errors.map(err => err.message) });
    }

    const { username, password } = validation.data;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ msg: "User created" });
});

router.post("/login", async (req, res) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ msg: validation.error.errors.map(err => err.message) });
    }

    const { username, password } = validation.data;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: "User doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userId: user._id });
});

export { router as userRouter };


