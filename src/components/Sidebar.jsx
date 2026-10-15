
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  CreditCard,
  Settings,
  Hotel,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Rooms", path: "/admin/rooms", icon: BedDouble },
    { name: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { name: "Guests", path: "/admin/guests", icon: Users },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to sign out of GrandStay Admin?"
    );

    if (!confirmed) return;

    // Remove the current admin session
    localStorage.removeItem("grandstayAuth");

    // Return to the Sign In page
    navigate("/signin", { replace: true });
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-900 text-white">
      {/* Hotel Logo */}
      <Link
        to="/admin"
        className="flex items-center gap-3 border-b border-slate-700 px-6 py-6"
      >
        <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
          <Hotel size={26} />
        </div>

        <div>
          <h1 className="text-lg font-bold">GrandStay</h1>
          <p className="text-xs text-slate-400">Hotel Management</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-amber-500 font-semibold text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* View Public Website */}
      <div className="px-4 pb-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <Hotel size={20} />
          <span>View Website</span>
        </Link>
      </div>

      {/* Sign Out */}
      <div className="border-t border-slate-700 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;