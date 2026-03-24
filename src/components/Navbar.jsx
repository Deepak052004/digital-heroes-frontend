import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 10, background: "#222", color: "white" }}>
      <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/draw" style={{ marginRight: 10 }}>Draw</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;