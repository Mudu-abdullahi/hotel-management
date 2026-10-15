import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Mail,
  Phone,
  X,
} from "lucide-react";

function Guests() {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "Mohamed Ali",
      email: "mohamed@example.com",
      phone: "0712345678",
      nationality: "Kenyan",
      bookings: 2,
    },
    {
      id: 2,
      name: "Amina Hassan",
      email: "amina@example.com",
      phone: "0723456789",
      nationality: "Kenyan",
      bookings: 1,
    },
    {
      id: 3,
      name: "Ahmed Omar",
      email: "ahmed@example.com",
      phone: "0734567890",
      nationality: "Somali",
      bookings: 3,
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima@example.com",
      phone: "0745678901",
      nationality: "Kenyan",
      bookings: 1,
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
  });

  const filteredGuests = guests.filter((guest) => {
    const query = search.toLowerCase();

    return (
      guest.name.toLowerCase().includes(query) ||
      guest.email.toLowerCase().includes(query) ||
      guest.phone.includes(query)
    );
  });

  function handleAddGuest(e) {
    e.preventDefault();

    const emailExists = guests.some(
      (guest) =>
        guest.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (emailExists) {
      alert("A guest with this email already exists.");
      return;
    }

    const newGuest = {
      ...form,
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      nationality: form.nationality.trim(),
      bookings: 0,
    };

    setGuests((current) => [...current, newGuest]);

    setForm({
      name: "",
      email: "",
      phone: "",
      nationality: "",
    });

    setShowForm(false);
  }

  function handleDeleteGuest(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this guest?"
    );

    if (confirmed) {
      setGuests((current) =>
        current.filter((guest) => guest.id !== id)
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Guest Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage guest profiles and contact information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700"
        >
          <Plus size={18} />
          Register Guest
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Guests</p>
            <Users size={22} className="text-blue-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {guests.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Repeat Guests</p>
            <Users size={22} className="text-purple-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {guests.filter((guest) => guest.bookings > 1).length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Guest Nationalities</p>
            <Users size={22} className="text-green-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {new Set(guests.map((guest) => guest.nationality)).size}
          </p>
        </div>
      </div>

      {/* Registration Form */}
      {showForm && (
        <form
          onSubmit={handleAddGuest}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              Register New Guest
            </h3>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Full name"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email address"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Phone number"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              required
              value={form.nationality}
              onChange={(e) =>
                setForm({ ...form, nationality: e.target.value })
              }
              placeholder="Nationality"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400"
          >
            Save Guest
          </button>
        </form>
      )}

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
        <Search size={20} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="w-full py-4 text-sm outline-none"
        />
      </div>

      {/* Guest Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h3 className="font-bold text-slate-800">All Guests</h3>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredGuests.length} of {guests.length} guests
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4">Guest</th>
                <th className="px-5 py-4">Contact Information</th>
                <th className="px-5 py-4">Nationality</th>
                <th className="px-5 py-4">Bookings</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                        {guest.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {guest.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Guest #{guest.id.toString().slice(-5)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-2 text-slate-600">
                      <p className="flex items-center gap-2">
                        <Mail size={15} />
                        {guest.email}
                      </p>

                      <p className="flex items-center gap-2">
                        <Phone size={15} />
                        {guest.phone}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {guest.nationality}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {guest.bookings}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      title="Delete guest"
                      aria-label={`Delete ${guest.name}`}
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredGuests.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No guests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Guests;