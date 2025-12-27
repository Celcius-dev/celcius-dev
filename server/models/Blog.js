import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    imageFit: {
      type: String,
      default: "cover",
      enum: ["cover", "contain"],
    },

    summary: {
      type: String,
      required: true,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
