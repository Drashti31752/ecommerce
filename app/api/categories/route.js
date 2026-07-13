import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Category } from "../../../../models/Category";

// Create Category
export async function POST(request) {
  try {
    await connectDB();

    const { name, image, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required",
        },
        { status: 400 },
      );
    }

    const exists = await Category.findOne({ name });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists",
        },
        { status: 400 },
      );
    }

    const category = await Category.create({
      name,
      image,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category,
      },
      { status: 201 },
    );
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

// Get All Categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      categories,
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
