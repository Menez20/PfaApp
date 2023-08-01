import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// register
/**
 * Register a user
 * @param {any} req
 * @param {any} res
 * @returns {any} created user
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address, phone } = req.body;

    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);

    const profilePicture = req.file.filename;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phone,
      profilePicture,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ email: "Email already exists!" });
    } else if (error.name === "ValidationError") {
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

// login
/**
 * Login a user
 * @param {any} req
 * @param {any} res
 * @returns {any} user and token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // user checking
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials!" });

    const isPasswordCorrect = await bycrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // token creation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // response
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
