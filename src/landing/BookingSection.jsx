
import { useState } from "react";
import {
  CalendarDays,
  Users,
  BedDouble,
  Search,
  CheckCircle,
} from "lucide-react";

function BookingSection() {
  // Get today's date in local time
  const today = new Date();

  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Booking form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "Deluxe Room",
  });

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setSubmitted(false);
  }

  // Save booking request in localStorage
  function handleSubmit(event) {
    event.preventDefault();

    if (formData.checkIn < localToday) {
      setMessage("Check-in date cannot be in the past.");
      setSubmitted(false);
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      setMessage("Check-out must be after check-in.");
      setSubmitted(false);
      return;
    }

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem("grandstayBookings") || "[]"
      );

      if (!Array.isArray(existingBookings)) {
        throw new Error("Saved booking data is invalid.");
      }

      const newBooking = {
        id: `BK-${Date.now()}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
        roomType: formData.roomType,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "grandstayBookings",
        JSON.stringify([...existingBookings, newBooking])
      );

      setSubmitted(true);
      setMessage(
        `Thank you, ${newBooking.fullName}! Your booking request has been saved successfully.`
      );

      // Clear the form after successful submission
      setFormData({
        fullName: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        roomType: "Deluxe Room",
      });
    } catch (error) {
      console.error("Booking save error:", error);
      setSubmitted(false);
      setMessage(
        "Unable to save your booking. Please check your browser storage and try again."
      );
    }
  }

  return (
    <section
      id="booking"
      className="scroll-mt-24 bg-slate-950 px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Reserve Your Stay
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Book Your Perfect Room
          </h2>

          <p className="mt-4 text-slate-300">
            Complete the form below to submit your booking request.
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-5 shadow-xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                maxLength={100}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                maxLength={254}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Room Type */}
            <div>
              <label
                htmlFor="roomType"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <BedDouble size={17} />
                Room Type
              </label>

              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              >
                <option>Deluxe Room</option>
                <option>Executive Suite</option>
                <option>Family Room</option>
              </select>
            </div>

            {/* Check-in */}
            <div>
              <label
                htmlFor="checkIn"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <CalendarDays size={17} />
                Check-in Date
              </label>

              <input
                id="checkIn"
                name="checkIn"
                type="date"
                min={localToday}
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="checkOut"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <CalendarDays size={17} />
                Check-out Date
              </label>

              <input
                id="checkOut"
                name="checkOut"
                type="date"
                min={formData.checkIn || localToday}
                value={formData.checkOut}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label
                htmlFor="guests"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <Users size={17} />
                Number of Guests
              </label>

              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </div>
          </div>

          {/* Submission Feedback */}
          {message && (
            <div
              role="status"
              className={`mt-6 flex items-start gap-3 rounded-lg p-4 text-sm ${
                submitted
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {submitted && (
                <CheckCircle size={20} className="mt-0.5 shrink-0" />
              )}

              <div>
                <p>{message}</p>

                {submitted && (
                  <p className="mt-2 font-medium">
                    Request status: Pending. This is a demo booking; the hotel
                    has not received a notification.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            <Search size={20} />
            Submit Booking Request
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            Demo version: booking requests are stored only in this browser.
          </p>
        </form>
      </div>
    </section>
  );
}

export default BookingSection;
