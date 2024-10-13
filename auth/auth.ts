import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import email from "next-auth/providers/email"
import { MongoClient } from "mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import connectDB from "@/utils/mongoDBConncet"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Github,
        Credentials({
            credentials: {
                email: { type: "email" },
                password: {
                    type: "password",
                }
            },
            authorize: async (credentials) => {

                const email = credentials.email as string
                const password = credentials.password as string

                await connectDB()

                const user = await User.findOne({
                    email: email
                })

                if (!user || !user.password) {
                    return null
                }

                const passIsMatched = await bcrypt.compare(password, user.password)

                if (!passIsMatched) {
                    return null
                }

                return user
            }
        })
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider === "credentials") {
                return true; // Allow sign-in for credentials provider
            }

            if (account?.provider === "github") {
                await connectDB();

                const userExists = await User.findOne({
                    email: user.email
                });

                if (userExists) {
                    return false; // Prevent sign-in if user already exists
                }

                const newUser = await User.create({
                    name: user.name,
                    email: user.email,
                    provider: account.provider,
                    providerId: account.providerAccountId
                });

                return true;
            }

            // Add Google sign-in handling
            if (account?.provider === "google") {
                await connectDB();

                const userExists = await User.findOne({
                    email: user.email
                });

                if (userExists) {
                    return true; // Allow sign-in if user already exists
                }

                // Optionally create a new user if they don't exist
                const newUser = await User.create({
                    name: user.name,
                    email: user.email,
                    provider: account.provider,
                    providerId: account.providerAccountId
                });

                return true; // Allow sign-in for new Google user
            }

            return false;
        }
    }
})



