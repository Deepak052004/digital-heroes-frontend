import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://digital-heroes-backend.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={submitHandler}
        className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-xl w-full max-w-md shadow-lg border border-gray-700"
      >

        <h2 className="text-3xl mb-6 text-center font-semibold">
          Welcome Back 👋
        </h2>

        {/* EMAIL */}
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label className="text-sm text-gray-400">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-6 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`w-full p-3 rounded font-semibold
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* LINK */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;