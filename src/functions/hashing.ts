import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt = jsonwebtoken;

export const signToken = async (username: string) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
  return token;
};
