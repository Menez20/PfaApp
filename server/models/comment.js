import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: "Comment content is required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
