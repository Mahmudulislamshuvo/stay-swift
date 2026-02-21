import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./lib/mongoDb";
import client from "./lib/mongo-serverPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { userModel } from "./models/userModel";

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
        // In a real app, you would verify credentials against a database
        if (credentials === null) return null;
        await dbConnect();

        const { email, password } = credentials;
        try {
          const user = await userModel.findOne({ email: email });

          if (user) {
            const isMatch = user.password === password;
            if (isMatch) {
              return user;
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("No user found with this email");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});
