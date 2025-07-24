"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";
import { useActionState, useEffect, useInsertionEffect, useState } from "react";
import { registerAction } from "./action";
import { password } from "bun";

export default function Page() {
  const [data, action, isLoading] = useActionState(registerAction, undefined);

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState("");

  useEffect(() => {
    if (data?.message) {
      console.log("ERROR");
      
      setErr(data.message);
    }
    if (data?.state) {
      setState({
        ...(data.state as any),
      });
    }
  }, [data]);

  return (
    <div className="flex items-center flex-1 justify-center">
      <form
        className="p-3 space-y-4 max-w-lg w-[90%] flex flex-col"
        action={action}
      >
        <Input
          id="username"
          name="username"
          type="text"
          label="Username"
          defaultValue={state?.username ?? ""}
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          defaultValue={state.email ?? ""}
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          defaultValue={state.password ?? ""}
          required
        />
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          label="Confirm Password"
          required
          defaultValue={state.confirmPassword ?? ""}
        />

        <div>
          <button
            type="submit"
            className="bg-zinc-400 p-3 py-1 rounded-sm text-black disabled:bg-zinc-700 disabled:cursor-not-allowed cursor-pointer"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <span className="text-sm text-red-600 ">{err}</span>

        <Link
          href={"/login"}
          className="text-sm text-blue-400 hover:underline underline-offset-2"
        >
          Already created an account, login...
        </Link>
      </form>
    </div>
  );
}
