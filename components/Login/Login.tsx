"use client";

import React from "react";
import { TextInput, FormError, Button } from "..";

export type LoginProps = {
  onSubmit?: (credentials: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string | null;
};

export const Login: React.FC<LoginProps> = ({
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(to_right,_#225acb_0%,_#030cb0_50%,_#93c5fd_50%,_#3b82f6_100%)] dark:bg-[linear-gradient(to_right,_#374151_0%,_#4b5563_50%,_#1f2937_50%,_#111827_100%)]">
      <form
        onSubmit={handleSubmit}
        className=" rounded-md w-full max-w-sm space-y-4 border-t-2 border-blue-500 border-b-2 border-blue-500 bg-white py-8 px-2 shadow-md shadow-blue-900"
      >
        <TextInput
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormError message={error ?? undefined} />

        <Button
          type="submit"
          size="md"
          variant="primary"
          loading={loading}
          className="w-full"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};
