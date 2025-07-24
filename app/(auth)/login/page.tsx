"use client";

import Input from "@/components/ui/Input";
import { useActionState, useEffect, useInsertionEffect, useState } from "react";
import { loginAction } from "./action";
import Link from "next/link";

export default function Page() {
  const [data, action, isLoading] = useActionState(loginAction, undefined);

  const [err, setErr] = useState("");

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!data) return;
    if (!data.success) {
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
          label="Username or Email"
          defaultValue={state.password}
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          defaultValue={state.username}
          required
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

        <Link
          href={"/register"}
          className="text-sm text-blue-400 hover:underline underline-offset-2"
        >
          Haven&apos;t created any account yet, register.{" "}
        </Link>
      </form>
    </div>
  );
}
