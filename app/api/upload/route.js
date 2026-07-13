import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("Content-Type:", request.headers.get("content-type"));

    const formData = await request.formData();

    console.log([...formData.keys()]);

    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file received",
      });
    }

    return NextResponse.json({
      success: true,
      name: file.name,
      size: file.size,
      type: file.type,
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
