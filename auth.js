import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./lib/mongoDb";
import client from "./lib/mongo-serverPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { userModel } from "./models/userModel";
import bcrypt from "bcrypt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        await dbConnect();

        const { email, password } = credentials;
        try {
          const user = await userModel.findOne({ email: email.toLowerCase() }).lean();

          if (user) {
            const isMatch = await bcrypt.compare(
              password,
              user.password,
            );

            if (isMatch) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                image: user.image,
              };
            } else {
              throw new Error("Invalid password or email");
            }
          } else {
            throw new Error("No user found with this email");
          }
        } catch (error) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
});
