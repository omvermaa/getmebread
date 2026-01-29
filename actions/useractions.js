"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/app/db/connectDb";


export const createRazorpayOrder = async (amount, to_user_email, paymentForm) => {
  // await mongoose.connect("mongodb://localhost:27017/getmefunds");
  await connectDB();
  const user = await User.findOne({ email: to_user_email });
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.razorpayId || !user.razorpaySecret) {
    throw new Error("Razorpay credentials missing");
  }
  const instance = new Razorpay({
    key_id: user.razorpayId,
    key_secret: user.razorpaySecret,
  });
  let options = {
    amount: Number.parseInt(amount),
    currency: "INR"
  }
  let x = await instance.orders.create(options);
  const newPayment = await new Payment({
    amount: amount / 100,
    to_user_email: to_user_email,
    oid: x.id,
    name: paymentForm.name,
    message: paymentForm.message
  }).save();
  return x;
}

export const deleteUserAccount = async (email) => {
  try {
    await connectDB();

    // Delete the user
    await User.deleteOne({ email: email });

    // Optional: Delete related data (payments, etc.) if needed
    // await Payment.deleteMany({ to_user: email }); 

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: error.message };
  }
};

export const searchUsers = async (query) => {
  if (!query) return [];

  try {
    await connectDB();
    // Find users where username OR name matches the query (case-insensitive)
    // Limit to top 5 results to keep dropdown clean
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } }
      ]
    }).select("name username profilePic").limit(5);

    // Convert to plain objects to pass to Client Component
    return users.map(user => ({
      username: user.username,
      name: user.name,
      profilePic: user.profilePic,
      // Convert _id to string if needed, mostly username is enough for routing
      id: user._id.toString()
    }));
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};


export const fetchuser = async (email) => {
  await connectDB();
  const u = await User.findOne({ email });
  if (!u) return null;
  let user = JSON.parse(JSON.stringify(u));
  return user;
}

export const fetchuserbyUsername = async (username) => {
  // await mongoose.connect("mongodb://localhost:27017/getmefunds");
  await connectDB();
  const u = await User.findOne({ username });
  if (!u) return null;
  let user = JSON.parse(JSON.stringify(u));
  return user;
}

export const fetchpayment = async (email) => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/getmefunds");
    await connectDB();
    const p = await Payment.find({ to_user_email: email, done: true }).sort({ amount: -1 }).lean();
    return JSON.parse(JSON.stringify(p));
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
}

export const updateProfile = async (data, email) => {
  // await mongoose.connect("mongodb://localhost:27017/getmefunds");
  await connectDB();

  // clone data
  const ndata = { ...data };

  // ❌ never update these
  delete ndata._id;
  delete ndata.email;

  // username uniqueness check
  const currentUser = await User.findOne({ email });

  if (ndata.username && ndata.username !== currentUser.username) {
    const existingUser = await User.findOne({ username: ndata.username });
    if (existingUser) {
      throw new Error("Username already taken");
    }
  }

  const result = await User.updateOne(
    { email },          // ✅ stable identifier
    { $set: ndata }
  );

  return result;
};
