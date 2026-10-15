import { useState } from "react";
import {
  BedDouble,
  Search,
  Plus,
  Users,
  Pencil,
  Trash2,
} from "lucide-react";

function Rooms() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: "101",
      type: "Single",
      price: 2500,
      capacity: 1,
      status: "Available",
    },
    {
      id: 2,
      number: "102",
      type: "Double",
      price: 4000,
      capacity: 2,
      status: "Occupied",
    },
    {
      id: 3,
      number: "103",
      type: "Deluxe",
      price: 6500,
      capacity: 2,
      status: "Available",
    },
    {
      id: 4,
      number: "201",
      type: "Suite",
      price: 10000,
      capacity: 4,
      status: "Maintenance",
    },
    {
      id: 5,
      number: "202",
      type: "Double",
      price: 4000,
      capacity: 2,
      status: "Occupied",
    },
    {
      id: 6,
      number: "203",
      type: "Single",
      price: 2500,
      capacity: 1,
      status: "Available",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "Single",
    price: "",
    capacity: "1",
    status: "Available",
  });

  const statusColors = {
    Available: "bg-green-100 text-green-700",
    Occupied: "bg-blue-100 text-blue-700",
    Maintenance: "bg-red-100 text-red-700",
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || room.status === filter;

    return matchesSearch && matchesFilter;
  });

  function handleAddRoom(e) {
    e.preventDefault();

    if (
      rooms.some((room) => room.number === newRoom.number.trim())
    ) {
      alert("This room number already exists.");
      return;
    }

    setRooms([
      ...rooms,
      {
        ...newRoom,
        id: Date.now(),
        number: newRoom.number.trim(),
        price: Number(newRoom.price),
        capacity: Number(newRoom.capacity),
      },
    ]);

    setNewRoom({
      number: "",
      type: "Single",
      price: "",
      capacity: "1",
      status: "Available",
    });

    setShowForm(false);
  }

  function handleDeleteRoom(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (confirmed) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Room Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage room details, prices, and availability.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <Plus size={18} />
          Add New Room
        </button>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Available", "Occupied", "Maintenance"].map((status) => (
          <div
            key={status}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{status} Rooms</p>
              <BedDouble size={22} className="text-slate-400" />
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-800">
              {rooms.filter((room) => room.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Add Room Form */}
      {showForm && (
        <form
          onSubmit={handleAddRoom}
          className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <h3 className="text-lg font-bold text-slate-800 sm:col-span-2 lg:col-span-3">
            Add a New Room
          </h3>

          <input
            required
            value={newRoom.number}
            onChange={(e) =>
              setNewRoom({ ...newRoom, number: e.target.value })
            }
            placeholder="Room number"
            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
          />

          <select
            value={newRoom.type}
            onChange={(e) =>
              setNewRoom({ ...newRoom, type: e.target.value })
            }
            className="rounded-lg border border-slate-300 px-4 py-3"
          >
            <option>Single</option>
            <option>Double</option>
            <option>Deluxe</option>
            <option>Suite</option>
          </select>

          <input
            required
            min="1"
            type="number"
            value={newRoom.price}
            onChange={(e) =>
              setNewRoom({ ...newRoom, price: e.target.value })
            }
            placeholder="Price per night (KSh)"
            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
          />

          <input
            required
            min="1"
            type="number"
            value={newRoom.capacity}
            onChange={(e) =>
              setNewRoom({ ...newRoom, capacity: e.target.value })
            }
            placeholder="Guest capacity"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <select
            value={newRoom.status}
            onChange={(e) =>
              setNewRoom({ ...newRoom, status: e.target.value })
            }
            className="rounded-lg border border-slate-300 px-4 py-3"
          >
            <option>Available</option>
            <option>Occupied</option>
            <option>Maintenance</option>
          </select>

          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400"
          >
            Save Room
          </button>
        </form>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3">
          <Search size={19} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search room number or type..."
            className="w-full py-3 text-sm outline-none"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm"
        >
          <option>All</option>
          <option>Available</option>
          <option>Occupied</option>
          <option>Maintenance</option>
        </select>
      </div>

      {/* Rooms Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h3 className="font-bold text-slate-800">All Rooms</h3>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4">Room</th>
                <th className="px-5 py-4">Room Type</th>
                <th className="px-5 py-4">Price/Night</th>
                <th className="px-5 py-4">Capacity</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    Room {room.number}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {room.type}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    KSh {room.price.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    <span className="flex items-center gap-2">
                      <Users size={16} />
                      {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[room.status]}`}
                    >
                      {room.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        title="Editing coming soon"
                        onClick={() =>
                          alert("Room editing will be added later.")
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Delete room"
                        onClick={() => handleDeleteRoom(room.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRooms.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No rooms found.
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

export default Rooms;