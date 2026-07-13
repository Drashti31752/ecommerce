import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.json({
    contentType: request.headers.get("content-type"),
 
 
  });
}