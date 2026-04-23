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
    <div className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative overflow-hidden font-sans" style={{ backgroundImage: "url('/images/login-bg.png')" }}>
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-0 h-full w-64 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/30 blur-[120px] animate-wave" style={{ clipPath: 'polygon(0% 0%, 100% 20%, 0% 40%, 100% 60%, 0% 80%, 100% 100%)' }} />
      </div>
      <div className="absolute right-0 top-0 h-full w-64 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/30 blur-[120px] animate-wave-reverse" style={{ clipPath: 'polygon(100% 0%, 0% 20%, 100% 40%, 0% 60%, 100% 80%, 0% 100%)' }} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] p-8 relative z-10 overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
        }}
      >
        {/* Left Side Wavy Border (Functional Loop) */}
        <div className="absolute left-0 top-0 bottom-0 w-3 opacity-90 pointer-events-none z-20">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 20 100">
            <path
              d="M5 0 Q 15 25 5 50 T 5 100"
              stroke="#34d399"
              strokeWidth="2"
              fill="none"
              strokeDasharray="15 15"
              className="animate-flow"
            />
          </svg>
        </div>
        {/* Right Side Wavy Border (Functional Loop) */}
        <div className="absolute right-0 top-0 bottom-0 w-3 opacity-90 pointer-events-none z-20">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 20 100">
            <path
              d="M15 0 Q 5 25 15 50 T 15 100"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="15 15"
              className="animate-flow"
            />
          </svg>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">Welcome</h1>
          <p className="text-white/80 text-sm font-medium">Please enter your details to sign in</p>
        </div>

        <div className="space-y-4">
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
        </div>

        <FormError message={errorMessage || error || undefined} />

        <Button
          type="submit"
          size="md"
          variant="primary"
          loading={isLoading || loading}
          className="w-full"
       
        >
          Sign in
        </Button>
       
      </form>
    </div>
  );
};
