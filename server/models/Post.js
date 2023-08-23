import mongoose from 'mongoose';
import comment from './comment.js';

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    topic: {
      type: String,
      required: 'Topic is required',
    },

    content: String,
    image: String,
    comments: {
      type: [comment.schema],
      default: [],
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
