import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Order from "../../../../models/Order";

// =====================
// Get Single Order
// =====================
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("ORDER ID:", id);

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
// =====================
// Update Order
// =====================
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const data = await request.json();

    const order = await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
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

// =====================
// Delete Order
// =====================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
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
