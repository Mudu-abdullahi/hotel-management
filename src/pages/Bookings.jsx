
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
} from "lucide-react";

const STORAGE_KEY = "grandstayBookings";

function readBookings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Bookings() {
  const [bookings, setBookings] = useState(readBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Refresh saved bookings when this page opens
  useEffect(() => {
    function loadBookings() {
      setBookings(readBookings());
    }

    loadBookings();

    // Detect changes made in another browser tab
    window.addEventListener("storage", loadBookings);

    // Detect bookings submitted elsewhere in this tab
    window.addEventListener("grandstay-bookings-updated", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
      window.removeEventListener("grandstay-bookings-updated", loadBookings);
    };
  }, []);

  function saveBookings(updatedBookings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Unable to save bookings:", error);
      alert("Could not save the booking changes.");
    }
  }

  function updateStatus(id, status) {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );

    saveBookings(updatedBookings);
  }

  function cancelBooking(booking) {
    const confirmed = window.confirm(
      `Cancel the booking request for ${booking.fullName}?`
    );

    if (!confirmed) return;

    updateStatus(booking.id, "Cancelled");
  }

  const normalizedSearch = search.trim().toLowerCase();

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = [
      booking.fullName,
      booking.email,
      booking.roomType,
      booking.id,
    ].some((value) =>
      String(value || "").toLowerCase().includes(normalizedSearch)
    );

    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  function statusStyle(status) {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Checked In":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-slate-200 text-slate-700";
      default:
        return "bg-amber-100 text-amber-800";
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Booking Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage guest booking requests.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setBookings(readBookings())}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw size={17} />
          Refresh Bookings
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Requests"
          value={bookings.length}
          icon={CalendarCheck}
          color="bg-blue-100 text-blue-700"
        />

        <SummaryCard
          title="Pending"
          value={pendingCount}
          icon={Clock}
          color="bg-amber-100 text-amber-700"
        />

        <SummaryCard
          title="Confirmed"
          value={confirmedCount}
          icon={CheckCircle}
          color="bg-green-100 text-green-700"
        />

        <SummaryCard
          title="Cancelled"
          value={cancelledCount}
          icon={XCircle}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3">
          <Search size={18} className="text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search guest, email, room or booking ID..."
            className="w-full py-3 text-sm outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
          aria-label="Filter bookings by status"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Checked In">Checked In</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-slate-900">Guest Requests</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredBookings.length} booking(s) displayed
          </p>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <CalendarCheck
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-800">
              No bookings found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Submit a booking request from the public website, or change
              your search and status filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Booking ID</th>
                  <th className="px-5 py-4">Guest</th>
                  <th className="px-5 py-4">Room</th>
                  <th className="px-5 py-4">Dates</th>
                  <th className="px-5 py-4">Guests</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {booking.id}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {booking.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {booking.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {booking.roomType}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      <p>In: {booking.checkIn}</p>
                      <p className="mt-1">Out: {booking.checkOut}</p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <Users size={15} />
                        {booking.guests}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {booking.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(booking.id, "Confirmed")
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
                          >
                            Confirm
                          </button>
                        )}

                        {booking.status === "Confirmed" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(booking.id, "Checked In")
                            }
                            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                          >
                            Check In
                          </button>
                        )}

                        {booking.status === "Checked In" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(booking.id, "Completed")
                            }
                            className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                          >
                            Complete
                          </button>
                        )}

                        {booking.status !== "Cancelled" &&
                          booking.status !== "Completed" && (
                            <button
                              type="button"
                              onClick={() => cancelBooking(booking)}
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                            >
                              Cancel
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Demo mode: bookings are stored in this browser only. They are not
        shared with other devices or browsers.
      </p>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

export default Bookings;
