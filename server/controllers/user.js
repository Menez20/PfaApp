import User from "../models/user.js";

/**
 * Get a user
 * @param {any} req
 * @param {any} res
 * @returns {any} requested user
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
