import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt = jsonwebtoken;

export const signToken = async (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string);
  return token;
};

export const verifyToken = async (token: string) => {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  return verifiedToken;
};
