import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Draw from "./pages/Draw";
import PrivateRoute from "./components/PrivateRoute";

function Layout() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10">

        {/* NAVBAR */}
        {token && !hideNavbar && (
          <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-black/40 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">

            <h1 className="text-lg md:text-xl font-bold tracking-wide">
              🎯 Digital Heroes
            </h1>

            <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base">

              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/draw"
                className="hover:text-purple-400 transition"
              >
                Draw
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 px-3 md:px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

          </nav>
        )}

        {/* ROUTES */}
        <div className="px-4 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Redirect if already logged in */}
            <Route
              path="/login"
              element={!token ? <Login /> : <Navigate to="/dashboard" />}
            />

            <Route
              path="/register"
              element={!token ? <Register /> : <Navigate to="/dashboard" />}
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

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

      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;