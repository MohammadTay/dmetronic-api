import mongoose from "mongoose";
const { Schema } = mongoose;

const SoftwareSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Software", SoftwareSchema);
