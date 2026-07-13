import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Wishlist from "../../../models/Wishlist";
import "../../../models/Product";

// ====================
// Add to Wishlist
// ====================
export async function POST(request) {
  try {
    await connectDB();

    const { userId, productId } = await request.json();

    const exists = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Product already in wishlist",
        },
        { status: 400 },
      );
    }

    const wishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });

    return NextResponse.json({
      success: true,
      message: "Added to wishlist",
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
