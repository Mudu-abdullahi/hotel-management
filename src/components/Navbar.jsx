import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pageTitles = {
    "/": "Dashboard",
    "/rooms": "Room Management",
    "/bookings": "Booking Management",
    "/guests": "Guest Management",
    "/payments": "Payment Management",
    "/settings": "Hotel Settings",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    // Navigate to the relevant management page.
    const searchRoutes = [
      "/rooms",
      "/bookings",
      "/guests",
      "/payments",
    ];

    const currentPage = location.pathname;

    if (searchRoutes.includes(currentPage)) {
      window.dispatchEvent(
        new CustomEvent("hotel-search", {
          detail: query,
        })
      );
    } else {
      navigate("/bookings", {
        state: { searchQuery: query },
      });
    }
  }

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (confirmed) {
      alert("This frontend demo does not have authentication yet.");
      setShowProfile(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
            {currentTitle}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Admin!
          </p>
        </div>

        {/* Search, Notifications and Profile */}
        <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:flex-none"
          >
            <Search size={19} className="shrink-0 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              aria-label="Search hotel records"
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none sm:w-36 lg:w-48"
            />

            <button type="submit" className="sr-only">
              Search
            </button>
          </form>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Bell size={22} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                <h3 className="font-semibold text-slate-800">
                  Notifications
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  You have no new notifications in this demo.
                </p>

                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Admin Profile */}
          <div className="relative">
            <button
              type="button"
              aria-label="Admin profile menu"
              aria-expanded={showProfile}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                A
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Hotel Manager
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-slate-500 sm:block"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/settings");
                    setShowProfile(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <User size={18} />
                  Hotel Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;