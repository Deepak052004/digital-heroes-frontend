import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setToken(data.token); // ✅ Update token state immediately
      window.dispatchEvent(new Event("storage")); // ✅ Notify App.js of token change
      navigate("/dashboard"); // ✅ Use navigate instead of window.location.hash
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
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-3xl mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 p-3 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-4">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;