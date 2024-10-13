import { IUser } from "@/interface/user_interface"
import User from "@/models/user"
import connectDB from "@/utils/mongoDBConncet"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const GET = async (request: Request) => {

    await connectDB()

    const users = await User.find()

    return NextResponse.json(users)
}

export const POST = async (request: Request) => {
    const user: IUser = await request.json()

    const hashedPassword = await bcrypt.hash(user.password as string, 10)

    await connectDB()

    const newuser = {
        name: user.name,
        email: user.email,
        password: hashedPassword,
    }

    const newUser = await User.create(newuser)

    return Response.json(newUser)
}