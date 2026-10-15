
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Hotel, LockKeyhole, Mail } from "lucide-react";

const ADMIN_EMAIL = "admin@grandstay.com";
const ADMIN_PASSWORD = "Admin123";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // Admin login
    if (
      email.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem(
        "grandstayAuth",
        JSON.stringify({
          email: ADMIN_EMAIL,
          role: "admin",
          signedInAt: new Date().toISOString(),
        })
      );

      navigate("/admin", { replace: true });
      return;
    }

    // Registered guest login
    try {
      const users = JSON.parse(
        localStorage.getItem("grandstayUsers") || "[]"
      );

      const user = users.find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password
      );

      if (user) {
        localStorage.setItem(
          "grandstayAuth",
          JSON.stringify({
            email: user.email,
            role: "guest",
          })
        );

        navigate("/", { replace: true });
        return;
      }
    } catch {
      setError("Unable to read saved accounts. Please try again.");
      return;
    }

    setError("Invalid email or password. Please try again.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-10">

        {/* Hotel Branding */}
        <Link to="/" className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-amber-500 p-3 text-slate-950">
            <Hotel size={27} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              GrandStay
            </h1>

            <p className="text-xs text-slate-500">
              HOTEL & HOSPITALITY
            </p>
          </div>
        </Link>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to access your GrandStay account.
        </p>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-amber-500">
              <Mail size={19} className="text-slate-400" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="username"
                required
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-amber-500">
              <LockKeyhole size={19} className="text-slate-400" />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-500 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-amber-700 hover:text-amber-800"
          >
            Sign Up
          </Link>
        </p>

        {/* Back to Website */}
        <Link
          to="/"
          className="mt-4 block text-center text-sm text-slate-500 hover:text-amber-700"
        >
          Back to Website
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
