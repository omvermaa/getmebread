import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  to_user_email: {
    type: String,
    required: true,
  },
  oid: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  done: {
    type: Boolean,
    default: false,
  }
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;