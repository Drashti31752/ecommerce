import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Cart from "../../../../models/Cart";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("Cart ID:", id);

    const cart = await Cart.findById(id);

    console.log("Cart:", cart);

    return NextResponse.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { quantity } = await request.json();

    const cart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// ====================
// DELETE Cart Item
// ====================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
