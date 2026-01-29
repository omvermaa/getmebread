import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/app/db/connectDb";

export const dynamic = 'force-dynamic';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      checks: ['pkce'],
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github' || account.provider === 'google' || account.provider === 'apple') {
        try {
          await connectDB();
          const currUser = await User.findOne({ email: user.email });
          if (!currUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
              name: user.name,
              profilePic: user.image,
              coverPic: "",
              razorpayId: "",
              razorpaySecret: ""
            });
            await newUser.save();
          }
        } catch (error) {
          console.error("Error saving user to DB:", error);
          return false;
        }
      }
      return true;
    }
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});

export { handler as GET, handler as POST };