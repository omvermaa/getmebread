import nodemailer from 'nodemailer';

export const sendPaymentEmail = async (toEmail, donorName, amount, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password (NOT your login password)
      },
    });

    const mailOptions = {
      from: `"GetMeFunding" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `🎉 You received ₹${amount} from ${donorName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px;">
            <h2 style="color: #6d28d9;">New Donation Received!</h2>
            <p><strong>${donorName}</strong> just bought you a bread worth <strong>₹${amount}</strong>.</p>
            <p style="font-style: italic; color: #555;">"${message || 'No message provided'}"</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">
              <a href="${process.env.NEXT_PUBLIC_URL}/dashboard">View Dashboard</a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email Error:", error);
    return false;
  }
};