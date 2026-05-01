import { Link, useLocation } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h2>🚀 Task Manager</h2>

      <div className="nav-links">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          className={location.pathname === "/tasks" ? "active" : ""}
        >
          Tasks
        </Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}