"use server";
import { SignJWT } from "jose";
import { cookies, type } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(target: string) {
  return await new SignJWT({
    target,
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
}

type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

export async function setServerCookie(
  name: string,
  value: string,
  options: CookieOptions,
) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}
