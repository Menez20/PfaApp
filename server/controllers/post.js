import Post from "../models/Post.js";

// create
/**
 * Create a post
 * @param {any} req
 * @param {any} res
 * @returns {any} array of posts
 */
export const createPost = async (req, res) => {
  try {
    const { topic, title, content } = req.body;
    const userId = req.user;
    const image = req.file.filename;

    const newPost = new Post({
      userId,
      topic,
      title,
      content,
      image,
    });

    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    if (error.name === "ValidationError") {
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
  } catch (error) {}
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
      res.status(401).json({ error: "You can only delete your own posts" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
