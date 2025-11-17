"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.data.user) {
        // Check if there's a redirect parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get("redirect");
        // Only redirect to dashboard or dashboard sub-routes for security
        const destination = redirectTo && redirectTo.startsWith("/dashboard") 
          ? redirectTo 
          : "/dashboard";
        router.push(destination);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Login failed");
      } else {
        setErrorMessage("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-700 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-500/20 blur-3xl" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_50px_-10px_rgba(0,0,0,0.5)] p-6"
      >
        <div className="space-y-1 text-center">
          <h1 className="text-white text-xl font-semibold">Welcome back</h1>
          <p className="text-white/70 text-sm">Sign in to continue</p>
        </div>
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

        <FormError message={errorMessage || error || undefined} />

        <Button
          type="submit"
          size="sm"
          variant="primary"
          loading={isLoading || loading}
          className="w-full "
        >
          Sign in
        </Button>
        <div className="text-center">
          <span className="text-xs text-white/60">
            Having trouble? Contact your administrator.
          </span>
        </div>
      </form>
    </div>
  );
};
