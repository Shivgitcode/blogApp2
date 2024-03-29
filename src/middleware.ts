import { JwtPayload } from "jsonwebtoken";
import AppError from "./errors.js";
import { verifyToken } from "./functions/hashing.js";

export const authenticated = async (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    next(new AppError("you are not logged In first login", 401));
  } else {
    next();
  }

  //   console.log(username);
};
