import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        email,
        createdAt: serverTimestamp(),
      });
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6">Access Portal</h2>

      <input
        className="mb-3 p-2 bg-black border border-green-500"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mb-3 p-2 bg-black border border-green-500"
        placeholder="Password"
        
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black"
      >
        {loading ? "Authenticating..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
