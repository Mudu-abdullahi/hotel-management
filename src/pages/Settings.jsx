import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Hotel,
  Phone,
  Mail,
  MapPin,
  Save,
  RotateCcw,
} from "lucide-react";

const defaultSettings = {
  hotelName: "GrandStay Hotel",
  email: "info@grandstay.com",
  phone: "+254 712 345 678",
  address: "Nairobi, Kenya",
  currency: "KSh",
  checkInTime: "12:00",
  checkOutTime: "10:00",
  emailNotifications: true,
  bookingNotifications: true,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("hotelSettings");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    try {
      localStorage.setItem("hotelSettings", JSON.stringify(settings));
      setMessage("Settings saved successfully!");
    } catch {
      setMessage("Unable to save settings in this browser.");
    }
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Reset all settings to their default values?"
    );

    if (!confirmed) return;

    setSettings({ ...defaultSettings });
    localStorage.removeItem("hotelSettings");
    setMessage("Settings have been reset.");
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
          <SettingsIcon size={27} />
          Hotel Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your hotel information and preferences.
        </p>
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hotel Information */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-lg bg-amber-100 p-3 text-amber-700">
              <Hotel size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Hotel Information
              </h3>
              <p className="text-sm text-slate-500">
                Basic details about your property.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Hotel Name
              </label>

              <input
                required
                name="hotelName"
                value={settings.hotelName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-4">
                <Mail size={18} className="text-slate-400" />

                <input
                  required
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-4">
                <Phone size={18} className="text-slate-400" />

                <input
                  required
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Hotel Address
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-4">
                <MapPin size={18} className="text-slate-400" />

                <input
                  required
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Preferences */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
              <SettingsIcon size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Booking Preferences
              </h3>
              <p className="text-sm text-slate-500">
                Configure currency and hotel times.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Currency
              </label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option value="KSh">Kenyan Shilling (KSh)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Check-in Time
              </label>

              <input
                type="time"
                name="checkInTime"
                value={settings.checkInTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Check-out Time
              </label>

              <input
                type="time"
                name="checkOutTime"
                value={settings.checkOutTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="font-bold text-slate-800">
            Notification Preferences
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Choose which notification preferences to enable in this demo.
          </p>

          <div className="mt-5 space-y-5">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="font-medium text-slate-700">
                  Email Notifications
                </p>
                <p className="text-sm text-slate-500">
                  Enable the email notification preference.
                </p>
              </div>

              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="h-5 w-5 accent-amber-500"
              />
            </label>

            <div className="border-t border-slate-100" />

            <label className="flex cursor-pointer items-center justify-between gap-4">
              <div>
                <p className="font-medium text-slate-700">
                  Booking Notifications
                </p>
                <p className="text-sm text-slate-500">
                  Enable the booking notification preference.
                </p>
              </div>

              <input
                type="checkbox"
                name="bookingNotifications"
                checked={settings.bookingNotifications}
                onChange={handleChange}
                className="h-5 w-5 accent-amber-500"
              />
            </label>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw size={18} />
            Reset Defaults
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;