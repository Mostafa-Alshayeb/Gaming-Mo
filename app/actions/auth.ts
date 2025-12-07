"use server";

import { cookies } from "next/headers";
import User from "../models/user";
import { connect } from "./connet";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_EXPIRES = 90 * 60; // 90 minutes
const generateToken = ({ id }: { id: string }) => {
  return jwt.sign({ id, type: "access" }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRES,
  });
};

interface SignUpData {
  name: string;
  email: string;
  password: string;
  avatar?: { secure_url: string; public_id: string };
}

// SIGN UP
export const signUp = async (data: SignUpData) => {
  try {
    await connect();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) return { error: "Email already exists" };

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });

    return {
      success: "User created successfully",
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error: any) {
    console.error("SignUp Error:", error);
    return { error: error.message || "User creation failed" };
  }
};

// LOGIN
export const login = async (data: { email: string; password: string }) => {
  try {
    await connect();
    const cookie = await cookies();
    console.log(data);
    const user = await User.findOne({ email: data.email }).select("+password");
    console.log(user);
    if (!user) {
      return { error: "User not found" };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { error: "Incorrect email or password !" }; //not make them know if it is the password or email
    }
    const userObj = JSON.parse(JSON.stringify(user));
    const token = await generateToken({ id: user._id });
    console.log(token);
    cookie.set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: "Login successful", data: userObj };
  } catch (error: any) {
    console.log(error);
    return { error: "Login failed", details: error.message };
  }
};

// PROTECT
export const protect = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token)
    return { error: "you are not authorized to preform this action"! };
  let decode;
  decode = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decode)
    return { error: "you are not authorized to preform this action"! };
  return { decode };
};

// GET USER
export const getUser = async () => {
  try {
    await connect();
    const { decode } = await protect();
    const user = await User.findById((decode as any).id);
    if (!user)
      return { error: "you are not authorized to preform this action"! };
    const userObj = JSON.parse(JSON.stringify(user));
    return { data: userObj };
  } catch (error) {
    return { error: "you are not authorized to preform this action"! };
  }
};

// LOGOUT
export const logout = async () => {
  try {
    (await cookies()).delete("token");
    return { success: "Logout successful" };
  } catch (error: any) {
    return { error: error.message || "Logout failed" };
  }
};
