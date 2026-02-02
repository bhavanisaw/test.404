import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[var(--neon-green)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-black/70 p-8 rounded-md border border-[var(--neon-green)]"
      >
        <h2 className="text-2xl mb-2 text-center">{mode === "signup" ? "Sign Up" : "Sign In"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 rounded bg-black border border-[var(--neon-green)] text-[var(--neon-green)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 rounded bg-black border border-[var(--neon-green)] text-[var(--neon-green)]"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="p-2 bg-[var(--neon-green)] text-black font-bold rounded">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-sm text-center">
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-[var(--plasma-magenta)] cursor-pointer hover:underline"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          >
            {mode === "signup" ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
