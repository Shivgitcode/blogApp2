import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwt = jsonwebtoken;
export const signToken = async (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return token;
};
export const verifyToken = async (token) => {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken;
};
