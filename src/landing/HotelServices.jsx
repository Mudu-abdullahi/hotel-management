
import {
  Utensils,
  Waves,
  Wifi,
  CarFront,
  ConciergeBell,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Restaurant & Dining",
    description:
      "Enjoy delicious meals and a welcoming dining experience.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description:
      "Relax and refresh in a comfortable leisure environment.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description:
      "Stay connected with reliable internet access during your stay.",
  },
  {
    icon: CarFront,
    title: "Parking",
    description:
      "Convenient parking arrangements for guests travelling by car.",
  },
  {
    icon: ConciergeBell,
    title: "Room Service",
    description:
      "Enjoy attentive service designed to make your stay easier.",
  },
  {
    icon: ShieldCheck,
    title: "Guest Security",
    description:
      "A welcoming environment with guest comfort and security in mind.",
  },
];

function HotelServices() {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
            Our Facilities
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything for a Better Stay
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Enjoy thoughtful amenities designed to make your visit
            comfortable, convenient, and memorable.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-amber-400 hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-amber-100 p-3 text-amber-700">
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HotelServices;
