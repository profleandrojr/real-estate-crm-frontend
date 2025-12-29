import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Home, LogOut } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-800 text-white"
      : "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-tight text-blue-400">
          CRM<span className="text-white">Pro</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(
              "/dashboard"
            )}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          {/* These Links must match the Routes in App.jsx */}
          <Link
            to="/leads"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(
              "/leads"
            )}`}
          >
            <Users size={20} /> Leads
          </Link>

          <Link
            to="/listings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(
              "/listings"
            )}`}
          >
            <Home size={20} /> Inventory
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition w-full">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
