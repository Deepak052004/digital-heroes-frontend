import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      await axios.post(
        "https://digital-heroes-backend.onrender.com/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");

      // 🔥 IMPORTANT FIX
      window.dispatchEvent(new Event("storage"));

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
          Create Account 🚀
        </h2>

        {/* NAME */}
        <label className="text-sm text-gray-400">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label className="text-sm text-gray-400">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-6 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-purple-500"
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
                : "bg-purple-500 hover:bg-purple-600"
            }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* LINK */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;