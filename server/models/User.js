import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
      minlength: [3, "First name should be at least 3 characters"],
      maxLength: [30, "First name should not be more than 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
      minlength: [3, "Last name should be at least 3 characters"],
      maxLength: [30, "Last name should not be more than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: "please enter a valid email address!",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
      minlength: [6, "Password should be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "consultant"],
      default: "user",
    },
    address: {
      type: String,
      trim: true,
      minlength: [6, "Address should be at least 6 characters"],
    },
    phone: {
      type: String,
      trim: true,
      minlength: [10, "Phone number should be at least 10 characters"],
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "please enter a valid phone number!",
      },
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
