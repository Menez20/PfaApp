import Post from '../models/Post.js';
import Comment from '../models/comment.js';

// create
/**
 * Create a post
 * @param {any} req
 * @param {any} res
 * @returns {any} array of posts
 */
export const createPost = async (req, res) => {
  try {
    const { topic, content } = req.body;
    const userId = req.user;
    const image = req.file.filename;

    const newPost = new Post({
      userId,
      topic,
      content,
      image,
    });

    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      res.status(400).json(validationErrors);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// read
/**
 * Get all posts
 * @param {any} req
 * @param {any} res
 * @returns {any} array of posts
 */
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a single post
 * @param {any} req
 * @param {any} res
 * @returns {any} post
 */
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * get a user's posts
 * @param {any} req
 * @param {any} res
 * @returns {any} array of posts
 */
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all comments of a post
 * @param {any} req
 * @param {any} res
 * @returns {any} array of comments
 */
export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('Post not found!');
    const comments = post.comments;
    res.status(200).json(comments);
  } catch (error) {
    if (error.message === 'Post not found!')
      res.status(404).json({ error: error.message });
    else res.status(500).json({ error: error.message });
  }
};

// update
/**
 * Like a post
 * @param {any} req
 * @param {any} res
 * @returns {any} post
 */
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user;
    const isLiked = post.likes.get(userId);

    if (!isLiked) {
      post.likes.set(userId, true);
      await post.save();
      res.status(200).json(post);
    } else {
      post.likes.delete(userId);
      await post.save();
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Comment on a post
 * @param {any} req
 * @param {any} res
 * @returns {any} post
 */
export const CommentPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    const userId = req.user;
    const comment = await Comment.create({ userId, content });
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete
/**
 * Delete a post
 * @param {any} req
 * @param {any} res
 * @returns {any} array of posts
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId.toString() === req.user) {
      await post.deleteOne();
      const posts = await Post.find();
      res.status(200).json(posts);
    } else {
      res.status(401).json({ error: 'You can only delete your own posts' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a comment
 * @param {any} req
 * @param {any} res
 * @returns {any} post
 */
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.id(req.params.commentId);

    if (!comment) throw new Error('Comment not found!');
    if (!post) throw new Error('Post not found!');

    if (
      comment.userId.toString() === req.user ||
      post.userId.toString() === req.user
    ) {
      await Comment.findByIdAndDelete(req.params.commentId);
      post.comments.pull(req.params.commentId);
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(401).json({ error: 'You can only delete your own comments' });
    }
  } catch (error) {
    if (error.message === 'Comment not found!')
      res.status(404).json({ error: error.message });
    else if (error.message === 'Post not found!')
      res.status(404).json({ error: error.message });
    else res.status(500).json({ error: error.message });
  }
};
