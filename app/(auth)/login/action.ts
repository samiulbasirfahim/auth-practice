"use server";

import { User } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { hasMessage } from "@/lib/typeguards";
import type { ActionReturn } from "@/types";

type ExtendedReturn = ActionReturn & {
  user?: User;
  state?: unknown;
};

export async function loginAction(
  _prevResponse: unknown,
  formData: FormData,
): Promise<ExtendedReturn> {
  const userData = {
    username: formData.get("username")?.toString().trim(),
    password: formData.get("password")?.toString().trim(),
  };
  try {
    const user: User | null = await prisma.user.findFirst({
      where: {
        OR: [{ email: userData.username }, { username: userData.username }],
      },
    });

    if (!user) {
      return {
        message: "User not found",
        success: false,
        state: userData,
      };
    }

    const auth = await prisma.auth.findFirst({
      where: {
        userId: user?.id,
      },
    });

    if (!auth) {
      return {
        message: "User not found",
        success: false,
        state: userData,
      };
    }

    const matched = await Bun.password.verify(
      auth?.password,
      userData.password ?? "",
    );

    if (matched) {
      return {
        success: true,
        message: "Logged in",
        user: user,
      };
    }

    return {
      success: false,
      message: "Wrong password",
      state: userData,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: hasMessage(err) ? err.message : "Unknown error",
      state: userData,
    };
  }
}
