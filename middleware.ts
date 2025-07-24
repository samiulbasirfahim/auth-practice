import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(req.cookies.getAll());
  console.log("HELLO");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
  ],
};
