import { dbConnect } from "@/lib/mongoDb";
import { userModel } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request, _response) => {
  const { fname, lname, email, password } = await request.json();
  await dbConnect();

  const hashPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name: `${fname} ${lname}`,
    email: email.toLowerCase(),
    password: hashPassword,
  };

  try {
    const createdUser = await userModel.create(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: createdUser,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
};
