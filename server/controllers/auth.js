import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// register
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
