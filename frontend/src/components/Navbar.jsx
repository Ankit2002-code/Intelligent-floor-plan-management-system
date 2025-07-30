import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isAdmin }) {
  const location = useLocation();
  return (
    <nav className="backdrop-blur-lg bg-glass/80 border-b border-white/10 sticky top-0 z-50 flex items-center justify-between px-8 py-3 shadow-lg rounded-b-2xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-neon mr-2">
          <span className="text-white text-xl font-extrabold">F</span>
        </div>
        <Link to="/" className="text-primary font-extrabold text-2xl tracking-tight">FloorPlan</Link>
      </div>
      <div className="flex gap-2 items-center">
        <NavLink to="/view" label="View Plans" active={location.pathname === "/view"} highlight />
        {isAdmin && <NavLink to="/update" label="Update Plans" active={location.pathname === "/update"} />}
      </div>
      <div className="flex items-center gap-2">
        <NavLink to="/login" label="Login" active={location.pathname === "/login"} highlight />
      </div>
    </nav>
  );
}

function NavLink({ to, label, active, highlight }) {
  return (
    <Link
      to={to}
      className={`relative mx-1 px-4 py-1.5 rounded-lg font-medium transition-all duration-200 
        ${active ? "text-primary bg-primary/20 shadow-neon" : highlight ? "text-primary hover:text-white hover:bg-primary/20" : "text-white/90 hover:text-primary hover:bg-primary/10"}
      `}
    >
      {label}
      {active && (
        <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-primary to-secondary rounded-full -translate-x-1/2 animate-pulse" />
      )}
    </Link>
  );
} 