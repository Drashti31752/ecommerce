import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";

export async function POST(request) {
  try {
    await connectDB();

    const { userId, productId, quantity } = await request.json();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    let cartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: userId,
        product: productId,
        quantity: quantity || 1,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Product added to cart",
      cartItem,
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

    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    const cart = await Cart.find({ user: userId }).populate("product");

    return NextResponse.json({
      success: true,
      cart,
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
