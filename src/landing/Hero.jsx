
import { ArrowRight, Star } from "lucide-react";

function Hero() {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85"
        alt="Luxury hotel surrounded by beautiful resort facilities"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />

      {/* Hero Content */}
      <div className="mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/10 px-4 py-2 text-sm text-amber-300 backdrop-blur">
            <Star size={16} fill="currentColor" />
            Exceptional comfort. Memorable stays.
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            Experience
            <span className="block text-amber-400">Luxury & Comfort</span>
            Like Never Before
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
            Discover a welcoming hotel experience where elegant rooms,
            thoughtful service, and unforgettable moments come together.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Explore Your Stay
              <ArrowRight size={19} />
            </a>

            <a
              href="#rooms"
              className="rounded-lg border border-white/40 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Rooms
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/20 pt-7">
            <div>
              <p className="text-2xl font-bold text-white">Premium</p>
              <p className="mt-1 text-sm text-slate-300">Room comfort</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">Personal</p>
              <p className="mt-1 text-sm text-slate-300">Guest service</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">Memorable</p>
              <p className="mt-1 text-sm text-slate-300">Experiences</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
