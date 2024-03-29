import { PrismaClient } from "@prisma/client";
import Cloudinary from "cloudinary";
import { verifyToken } from "../functions/hashing.js";
const cloudinary = Cloudinary.v2;
const prisma = new PrismaClient();
export const createPost = async (req, res, next) => {
    try {
        const files = req.files.imgFile;
        const token = req.cookies.jwt;
        const { id } = (await verifyToken(token));
        console.log(token);
        const response = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "Blogs",
        });
        const createPost = await prisma.post.create({
            data: {
                ...req.body,
                img: response.secure_url,
                userId: id,
            },
        });
        res.status(200).json({
            message: "post created",
            data: createPost,
            success: true,
        });
        // const newPost=
    }
    catch (error) {
        next(error);
    }
};
export const allPost = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const { id: userID } = (await verifyToken(token));
        const allPost = await prisma.post.findMany({
            include: {
                user: true,
            },
            where: {
                userId: userID,
            },
        });
        res.status(200).json({
            message: "posts sent",
            data: allPost,
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
