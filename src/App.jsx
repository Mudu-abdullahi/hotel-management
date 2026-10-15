import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import LandingPage from "./landing/LandingPage";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ProtectedAdminRoute from "./auth/ProtectedAdminRoute";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Guests from "./pages/Guests";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="min-h-screen md:ml-64">
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} GrandStay Hotel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Admin Pages */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="guests" element={<Guests />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;