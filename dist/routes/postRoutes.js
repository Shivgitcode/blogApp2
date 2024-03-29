import express from "express";
import { allPost, createPost } from "../controllers/post.js";
import { authenticated } from "../middleware.js";
const router = express.Router();
router.post("/post", authenticated, createPost);
router.get("/post", authenticated, allPost);
export { router };
