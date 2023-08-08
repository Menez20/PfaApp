import express from 'express';
import {
  getFeed,
  getPost,
  getPostsByUser,
  likePost,
  CommentPost,
  getPostComments,
  deleteComment,
  deletePost,
} from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// read
router.get('/', verifyToken, getFeed);
router.get('/:id', verifyToken, getPost);
router.get('/user/:userId', verifyToken, getPostsByUser);
router.get('/:id/comments', verifyToken, getPostComments);

// update
router.patch('/:id/like', verifyToken, likePost);
router.patch('/:id/comment', verifyToken, CommentPost);

// delete
router.delete('/:id', verifyToken, deletePost);
router.delete('/:id/comment/:commentId', verifyToken, deleteComment);

export default router;
