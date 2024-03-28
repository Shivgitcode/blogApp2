import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
const prisma = new PrismaClient();
const jwt = jsonwebtoken;
export const registerUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = await prisma.user.create({
            data: {
                ...req.body,
                password: hashPass,
            },
        });
        res.status(200).json({
            data: newUser,
            message: "user registered",
            success: true,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "internal server error",
            success: "false",
            error: err.message,
        });
    }
};
export const loginUser = async (req, res) => {
    try {
    }
    catch (error) { }
};
