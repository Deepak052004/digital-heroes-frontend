import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Draw from "./pages/Draw";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <Router>
      <div className="min-h-screen text-white">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* LOGIN */}
          <Route
            path="/login"
            element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/dashboard" />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* DRAW */}
          <Route
            path="/draw"
            element={
              <PrivateRoute>
                <Draw />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;