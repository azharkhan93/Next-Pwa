import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { verifyPassword } from "@/utils/password";

/**
 * Login API Route
 * POST /api/login
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userData,
      },
      { status: 200 }
    );

    // Set authentication cookie
    response.cookies.set("auth-token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
