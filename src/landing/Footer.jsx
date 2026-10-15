
import { Hotel, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Branding */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
              <Hotel size={25} />
            </div>

            <span className="text-xl font-bold text-white">
              GrandStay
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
            A welcoming destination for comfort, relaxation, and
            memorable hospitality.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="/#rooms" className="hover:text-amber-400">
                Our Rooms
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-amber-400">
                Hotel Services
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:text-amber-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/#booking" className="hover:text-amber-400">
                Plan Your Stay
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-white">Contact Us</h3>

          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-amber-400" />
              <span>Hotel address to be added</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-amber-400" />
              <span>Hotel phone to be added</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-amber-400" />
              <span>Hotel email to be added</span>
            </li>
          </ul>
        </div>

        {/* Booking CTA */}
        <div>
          <h3 className="font-bold text-white">Your Next Stay</h3>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            Discover a room that suits your travel plans.
          </p>

          <a
            href="/#booking"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Book a Room <ArrowUp size={17} />
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800 px-5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} GrandStay Hotel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
