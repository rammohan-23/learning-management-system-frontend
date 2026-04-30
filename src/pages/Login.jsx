import { useState } from "react";
import API from "../services/api";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
const [error, setError] = useState("");
    const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", user);

    // 🔥 IMPORTANT CHECK
    if (!res.data || res.data.length < 20) {
      setError("Invalid username or password");
      return;
    }

    localStorage.setItem("token", res.data);
    setError("");

    window.location.reload();
  } catch (err) {
  localStorage.removeItem("token"); // 🔥 important
  setError("Invalid username or password");
}
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        
        <h2 className="text-xl font-bold !text-black mb-4">
  LMS Login
</h2>

<p className="text-gray-500 text-center mb-4">
  Welcome back 👋
</p>

        <input
  className="w-full border p-2 mb-4 rounded"
  placeholder="Username"
  onChange={(e) => {
    setUser({ ...user, username: e.target.value });
    setError(""); // 🔥 clear error
  }}
/>

<input
  type="password"
  className="w-full border p-2 mb-4 rounded"
  placeholder="Password"
  onChange={(e) => {
    setUser({ ...user, password: e.target.value });
    setError(""); // 🔥 clear error
  }}
/>
{error && (
  <p className="text-red-500 text-sm mb-3 text-center">
    {error}
  </p>
)}

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;