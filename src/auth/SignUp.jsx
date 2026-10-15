import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Hotel, UserRound, Mail, LockKeyhole } from "lucide-react";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    try {
      const users = JSON.parse(
        localStorage.getItem("grandstayUsers") || "[]"
      );

      if (!Array.isArray(users)) {
        setError("Unable to read registered accounts.");
        return;
      }

      const email = formData.email.trim().toLowerCase();

      if (email === "admin@grandstay.com") {
        setError("This email is reserved for the demo admin account.");
        return;
      }

      if (users.some((user) => user.email.toLowerCase() === email)) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        id: `USER-${Date.now()}`,
        fullName: formData.fullName.trim(),
        email,
        password: formData.password,
        role: "guest",
      };

      localStorage.setItem(
        "grandstayUsers",
        JSON.stringify([...users, newUser])
      );

      alert("Account created successfully! Please sign in.");

      navigate("/signin", { replace: true });
    } catch {
      setError("Unable to create your account. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-10">
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

        <h2 className="text-3xl font-bold text-slate-900">
          Create Account
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Register as a guest to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-amber-500">
              <UserRound size={19} className="text-slate-400" />
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
                maxLength={100}
                required
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-amber-500">
              <Mail size={19} className="text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                required
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-3 focus-within:border-amber-500">
              <LockKeyhole size={19} className="text-slate-400" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter password again"
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-500 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/signin" className="font-bold text-amber-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;