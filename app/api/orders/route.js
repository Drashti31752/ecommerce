import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Order from "../../../../models/Order";
import User from "../../../models/User";
import Product from "../../../models/Product";

// =====================
// Create Order
// =====================
export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    const order = await Order.create(data);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order,
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

export async function GET(request) {
  try {
    await connectDB();

    const role = request.headers.get("role");

    if (role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Admin access required",
        },
        {
          status: 403,
        },
      );
    }

    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
