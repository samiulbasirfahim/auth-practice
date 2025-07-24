"use server";

import { encrypt, setServerCookie } from "@/lib/cookies";
import { Auth, User } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { hasMessage } from "@/lib/typeguards";
import type { ActionReturn } from "@/types";

type ExtendedReturn = ActionReturn & {
  user?: User;
  state?: unknown;
};

export async function registerAction(
  _prevResponse: unknown,
  formData: FormData,
): Promise<ExtendedReturn> {
  const userData = {
    username: formData.get("username")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    password: formData.get("password")?.toString(),
    confirmPassword: formData.get("confirm-password")?.toString(),
  };

  try {
    if (!/[a-z]/.test(userData.password ?? ""))
      return {
        message: "Password must include a lowercase letter",
        state: userData,
        success: true,
      };

    if (!/[A-Z]/.test(userData.password ?? ""))
      return {
        message: "Password must include a UPERCASE letter",
        state: userData,
        success: true,
      };

    if (!/\d/.test(userData.password ?? ""))
      return {
        message: "Password must include a number",
        state: userData,
        success: true,
      };
    if (!/[^\w\s]/.test(userData.password ?? ""))
      return {
        message: "Password must include a special character",
        state: userData,
        success: false,
      };

    if (userData.password && userData.password?.length < 8)
      return {
        message: "Password must be at least 8 characters long",
        success: false,
        state: userData,
      };

    if (
      !(
        userData.username &&
        userData.email &&
        userData.email &&
        userData.confirmPassword
      )
    ) {
      return {
        message: "Please fill up all the fields",
        state: userData,
        success: false,
      };
    }

    if (userData.username.split(" ").length > 1)
      return {
        state: userData,
        success: false,
        message: "You can't use space in username",
      };

    if (userData.password !== userData.confirmPassword)
      return {
        message: "Password and confirm password should be same",
        state: userData,
        success: false,
      };

    const hashedPassword = await Bun.password.hash(userData.password);

    const user: User | null = await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
      },
    });

    console.log("User created");

    await prisma.auth.create({
      data: {
        password: hashedPassword,
        userId: user.id,
      },
    });
    console.log("Auth info pushed");

    const token = await encrypt(user.id);
    setServerCookie("auth_token", token, {
      maxAge: 60 * 60 * 24 * 15,
      path: "/",
      httpOnly: true,
    });

    return {
      success: user ? true : false,
      message: "Logged in",
      user: user,
    };
  } catch (err: unknown) {
    return {
      success: false,
      state: userData,
      message: hasMessage(err) ? err.message : "Unknown error",
    };
  }
}
