import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import Product from "../../../../models/Product";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    return NextResponse.json({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
