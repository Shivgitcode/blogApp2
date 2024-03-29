import Cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = Cloudinary.v2;
export const cloudinaryConnect = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
};
