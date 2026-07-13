import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/Order";
import Product from "../../../../../models/Product";
import User from "../../../../../models/User";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const orders = await Order.find({
      user: id,
    })
      .populate("products.product")
      .populate("user")
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
