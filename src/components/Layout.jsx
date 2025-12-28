import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Home, Users, LogOut } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-800">
          CRM Monolith
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/listings"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"
          >
            <Home size={20} /> Listings
          </Link>
          <Link
            to="/leads"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"
          >
            <Users size={20} /> Leads
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 p-3 w-full hover:bg-red-900/20 text-red-400 rounded-lg transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />{" "}
        {/* This is where Dashboard, Listings, or Leads will render */}
      </main>
    </div>
  );
};

export default Layout;
