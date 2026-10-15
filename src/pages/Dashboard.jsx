import {
  BedDouble,
  CheckCircle,
  CalendarCheck,
  DollarSign,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import StatCard from "../components/StatCard";

function Dashboard() {
  const bookings = [
    {
      id: "BK001",
      guest: "Mohamed Ali",
      room: "101",
      checkIn: "Oct 14, 2026",
      checkOut: "Oct 16, 2026",
      status: "Confirmed",
    },
    {
      id: "BK002",
      guest: "Amina Hassan",
      room: "204",
      checkIn: "Oct 14, 2026",
      checkOut: "Oct 17, 2026",
      status: "Pending",
    },
    {
      id: "BK003",
      guest: "Ahmed Omar",
      room: "305",
      checkIn: "Oct 15, 2026",
      checkOut: "Oct 18, 2026",
      status: "Checked In",
    },
    {
      id: "BK004",
      guest: "Fatima Noor",
      room: "102",
      checkIn: "Oct 16, 2026",
      checkOut: "Oct 19, 2026",
      status: "Confirmed",
    },
  ];

  const statusColors = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    "Checked In": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Hotel Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening at your hotel today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Rooms"
          value="120"
          icon={BedDouble}
          color="bg-blue-100 text-blue-600"
          subtitle="All hotel rooms"
        />

        <StatCard
          title="Available Rooms"
          value="80"
          icon={CheckCircle}
          color="bg-green-100 text-green-600"
          subtitle="Ready for booking"
        />

        <StatCard
          title="Total Bookings"
          value="45"
          icon={CalendarCheck}
          color="bg-purple-100 text-purple-600"
          subtitle="Reservations recorded"
        />

        <StatCard
          title="Total Revenue"
          value="KSh 250,000"
          icon={DollarSign}
          color="bg-amber-100 text-amber-600"
          subtitle="Sample revenue"
        />
      </div>

      {/* Occupancy Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-800">
            Room Occupancy
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Current room utilization
          </p>

          <div className="my-6 flex items-center justify-center">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#10b981 0% 66.67%, #e2e8f0 66.67% 100%)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-slate-800">
                  67%
                </span>
                <span className="text-xs text-slate-500">
                  Occupied
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                Occupied
              </span>
              <span className="font-semibold">80 rooms</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                Unoccupied
              </span>
              <span className="font-semibold">40 rooms</span>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h3 className="font-bold text-slate-800">
            Today's Summary
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <ArrowUpRight size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    Check-ins
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    12
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    Check-outs
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    8
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-slate-100 p-4">
            <p className="text-sm text-slate-500">
              Front desk reminder
            </p>
            <p className="mt-1 font-medium text-slate-700">
              Review pending reservations and prepare rooms for
              today's arrivals.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-slate-800">
              Recent Bookings
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Overview of recent guest reservations
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Full bookings page coming soon!")}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Booking ID</th>
                <th className="px-5 py-4 font-semibold">Guest</th>
                <th className="px-5 py-4 font-semibold">Room</th>
                <th className="px-5 py-4 font-semibold">Check-in</th>
                <th className="px-5 py-4 font-semibold">Check-out</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {booking.id}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {booking.guest}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {booking.room}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {booking.checkIn}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {booking.checkOut}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;