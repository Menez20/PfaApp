import User from '../models/user.js';

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

export const getUsersByRole = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No users with the specified role found.' });
    }

    const formatedUsers = users.map((user) => {
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    res.status(200).json(formatedUsers);
    // console.log('users', formatedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
