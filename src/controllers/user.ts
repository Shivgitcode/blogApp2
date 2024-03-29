import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import AppError from "../errors.js";
import { signToken } from "../functions/hashing.js";

const prisma = new PrismaClient();
const jwt = jsonwebtoken;

export const registerUser = async (req: any, res: any) => {
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
  } catch (err: any) {
    res.status(500).json({
      message: "internal server error",
      success: "false",
      error: err.message,
    });
  }
};

export const loginUser = async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body;
    const foundUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log(foundUser);

    if (!foundUser) {
      return next(new AppError("user not found", 404));
    }

    const hashedPass = foundUser.password;
    const isLoggedIn = await bcrypt.compare(password, hashedPass);
    if (username === foundUser.username && isLoggedIn) {
      const token = await signToken(foundUser.id);
      console.log(token);
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      res.status(200).json({
        message: "successfully logged in",
        token: token,
      });
    } else {
      next(new AppError("invalid username or password", 401));
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: any, res: any, next: any) => {
  try {
    res.cookie("jwt", "", { maxAge: 5 });
    res.status(200).json({
      message: "successfully logged out",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
