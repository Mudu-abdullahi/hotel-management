
import { Link } from "react-router-dom";
import { Hotel, Menu, X } from "lucide-react";
import { useState } from "react";

function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/#rooms" },
    { name: "Services", path: "/#services" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Hotel Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
            <Hotel size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide text-slate-900">
              GrandStay
            </h1>
            <p className="text-xs tracking-widest text-amber-600">
              HOTEL & HOSPITALITY
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-sm font-medium text-slate-600 transition hover:text-amber-600"
            >
              {link.name}
            </a>
          ))}

          <a
            href="/#booking"
            className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Book a Room
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-800 hover:bg-slate-100 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/#booking"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-amber-500 px-4 py-3 text-center font-bold text-slate-950"
            >
              Book a Room
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default LandingNavbar;
