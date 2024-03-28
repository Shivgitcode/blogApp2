import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwt = jsonwebtoken;
export const signToken = async (username) => {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return token;
};
