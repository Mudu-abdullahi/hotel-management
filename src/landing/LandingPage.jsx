
import LandingNavbar from "./LandingNavbar";
import Hero from "./Hero";
import RoomShowcase from "./RoomShowcase";
import HotelServices from "./HotelServices";
import Footer from "./Footer";
import BookingSection from "./BookingSection";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>
        <Hero />
        <RoomShowcase />
        <HotelServices />
        <BookingSection />

        {/* About Section */}
        <section id="about" className="bg-slate-50 px-5 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Welcome to GrandStay
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Hospitality That Feels Like Home
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              At GrandStay, we believe every guest deserves comfort,
              attentive service, and a relaxing place to recharge.
              Whether you are travelling for business or leisure,
              we want your stay to feel special.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="bg-slate-950 px-5 py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Plan Your Stay?
            </h2>

            <p className="mt-4 text-slate-300">
              Explore our rooms and contact the hotel to arrange your booking.
            </p>

            <a
              href="#rooms"
              className="mt-7 inline-block rounded-lg bg-amber-500 px-7 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Find Your Room
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
