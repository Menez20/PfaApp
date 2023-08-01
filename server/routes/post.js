import express from "express";
import {
  getFeed,
  getPost,
  getPostsByUser,
  likePost,
  deletePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get("/", verifyToken, getFeed);
router.get("/:id", verifyToken, getPost);
router.get("/user/:userId", verifyToken, getPostsByUser);

// update
router.patch("/:id/like", verifyToken, likePost);

// delete
router.delete("/:id", verifyToken, deletePost);

export default router;
