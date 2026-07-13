import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Wishlist from "../../../../models/Wishlist";
import "../../../../models/Product";

// ====================
// GET Single Wishlist Item
// ====================
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const wishlist = await Wishlist.findById(id).populate("product");

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: "Wishlist item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      wishlist,
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

// ====================
// DELETE Wishlist Item
// ====================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const wishlist = await Wishlist.findByIdAndDelete(id);

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: "Wishlist item not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Wishlist item removed successfully",
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
