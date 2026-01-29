import mongoose from "mongoose";
// const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
  },
  coverPic: {
    type: String,
  },
  razorpayId: {
    type: String,
  },
  razorpaySecret: {
    type: String,
  },
  emailAlerts: { type: Boolean, default: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
