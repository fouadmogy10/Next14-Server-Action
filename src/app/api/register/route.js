import dbConnect from "../../../lib/db-connect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import user_model from "../../../lib/user_model";

export const POST = async (request) => {
  const { firstName, lastName, userName, email, password } =
    await request.json();

  await dbConnect();
  const existingUser = await user_model.findOne({ email });
  if (existingUser) {
    return new NextResponse(JSON.stringify({ message: "Email is already in use" }), { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new user_model({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse(JSON.stringify({ message: "user is registered" }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.toString() }), {
      status: 500,
    });
  }
};
