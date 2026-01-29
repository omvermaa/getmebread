// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/models/Payment";
// import User from "@/models/User";
// import connectDB from "@/app/db/connectDb";
// import { sendPaymentEmail } from "@/utils/sendEmail";

// export async function POST(req) {
//   await connectDB();

//   let body = await req.formData();
//   body = Object.fromEntries(body.entries());

//   // 1. Find the payment record first to see who this payment is for
//   let p = await Payment.findOne({ oid: body.razorpay_order_id });
//   if (!p) {
//     return NextResponse.json({ status: "error", message: "Order ID not found" }, { status: 404 });
//   }

//   // 2. Fetch the Page Owner (Recipient) to get *THEIR* Secret Key
//   // We use the email saved in the payment record
//   const user = await User.findOne({ email: p.to_user_email });
//   if (!user || !user.razorpaySecret) {
//       return NextResponse.json({ status: "error", message: "Recipient user or secret not found" }, { status: 400 });
//   }

//   // 3. Verify the signature using the PAGE OWNER'S secret
//   const isValid = validatePaymentVerification({
//     "order_id": body.razorpay_order_id,
//     "payment_id": body.razorpay_payment_id
//   }, body.razorpay_signature, user.razorpaySecret); // <--- Critical Fix Here

//   if (isValid) {
//     p.done = true;
//     await p.save();

//     // Send Email Notification to the Recipient
//     await sendPaymentEmail({
//       to: p.to_user_email,
//       amount: p.amount,
//       donorName: p.name,
//       message: p.message
//     });

//     // Redirect to the user's page
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${user.username}?payment=success`);
//   } else {
//     return NextResponse.json({ status: "error", message: "Invalid signature" }, { status: 400 });
//   }

// }


import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/app/db/connectDb";
import { sendPaymentEmail } from "@/app/utils/sendEmail"; // Import the helper

export const POST = async (req) => {
  await connectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);

  // 1. Verify Payment Signature
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Not Found" });
  }
  const user = await User.findOne({ email: p.to_user_email });

  // Check signature
  let isValid = validatePaymentVerification(
    { "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id },
    body.razorpay_signature,
    user.razorpaySecret
  );

  if (isValid) {
    // 2. Update Payment Status in DB
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    // 3. ✅ CHECK SETTINGS & SEND EMAIL
    // Find the recipient (the person receiving the money)
    const recipientUser = await User.findOne({ email: updatedPayment.to_user_email });

    // IF user exists AND has opted in for alerts
    if (recipientUser && recipientUser.emailAlerts) {
      await sendPaymentEmail(
        recipientUser.email,         // Recipient Email
        updatedPayment.name,         // Donor Name
        updatedPayment.amount,       // Amount
        updatedPayment.message       // Message
      );
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${recipientUser.username}?payment=success`);
  } else {
    return NextResponse.json({ success: false, message: "Payment Verification Failed" });
  }
};