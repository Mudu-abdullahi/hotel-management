
import { ArrowRight, BedDouble, Users, Wifi } from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    description: "A peaceful room with elegant interiors and modern comfort.",
    price: 8500,
    guests: 2,
    beds: "1 King Bed",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Executive Suite",
    description: "Extra space and premium comfort for a special stay.",
    price: 14500,
    guests: 2,
    beds: "1 King Bed",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Family Room",
    description: "A spacious room designed for relaxing family trips.",
    price: 18000,
    guests: 4,
    beds: "2 Double Beds",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
  },
];

function RoomShowcase() {
  return (
    <section id="rooms" className="scroll-mt-24 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Accommodation
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Discover Our Rooms
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Find the right space for your next relaxing getaway.
            </p>
          </div>

          <a
            href="#booking"
            className="inline-flex items-center gap-2 font-semibold text-amber-700 hover:text-amber-800"
          >
            Explore your stay <ArrowRight size={18} />
          </a>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow">
                  Premium Stay
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {room.name}
                  </h3>

                  <p className="shrink-0 text-right text-amber-700">
                    <span className="text-lg font-extrabold">
                      KSh {room.price.toLocaleString("en-KE")}
                    </span>
                    <span className="block text-xs text-slate-500">
                      per night
                    </span>
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {room.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Users size={17} /> {room.guests} guests
                  </span>

                  <span className="flex items-center gap-2">
                    <BedDouble size={17} /> {room.beds}
                  </span>

                  <span className="flex items-center gap-2">
                    <Wifi size={17} /> Wi-Fi
                  </span>
                </div>

                <a
                  href="#booking"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
                >
                  View Booking Options <ArrowRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Demonstration prices only. Replace them with your hotel's actual rates.
        </p>
      </div>
    </section>
  );
}

export default RoomShowcase;
