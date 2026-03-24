import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }
    try {
      await axios.post(
        "https://digital-heroes-backend.onrender.com/api/auth/register",
        { name, email, password }
      );
      alert("Registered successfully");
      navigate("/login"); // ✅ Use navigate instead of window.location.hash
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-3xl mb-6 text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="w-full bg-purple-500 p-3 rounded">
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;