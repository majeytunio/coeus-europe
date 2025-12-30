"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signup() {
    setLoading(true);
    setError("");
    
    router.push("/admin/signup");
    
    setLoading(false);
  }
  
  
  
  async function login() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Admin Login</h1>

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-3 rounded text-gray-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 mb-4 rounded text-gray-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          onClick={signup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
        >
          {loading ? "Redirecting..." : "Don't Have An Account? Signup"}
        </button>
      </div>
    </div>
  );
}
