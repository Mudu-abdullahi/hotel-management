import { useState } from "react";
import {
  CreditCard,
  Search,
  Plus,
  Banknote,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";

function Payments() {
  const [payments, setPayments] = useState([
    {
      id: "PAY001",
      guest: "Mohamed Ali",
      bookingId: "BK001",
      date: "2026-10-12",
      method: "M-Pesa",
      amount: 5000,
      status: "Paid",
    },
    {
      id: "PAY002",
      guest: "Amina Hassan",
      bookingId: "BK002",
      date: "2026-10-12",
      method: "Card",
      amount: 12000,
      status: "Pending",
    },
    {
      id: "PAY003",
      guest: "Ahmed Omar",
      bookingId: "BK003",
      date: "2026-10-13",
      method: "Cash",
      amount: 19500,
      status: "Paid",
    },
    {
      id: "PAY004",
      guest: "Fatima Noor",
      bookingId: "BK004",
      date: "2026-10-13",
      method: "M-Pesa",
      amount: 30000,
      status: "Failed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    guest: "",
    bookingId: "",
    date: new Date().toLocaleDateString("en-CA"),
    method: "M-Pesa",
    amount: "",
  });

  const filteredPayments = payments.filter((payment) => {
    const query = search.toLowerCase();

    const matchesSearch =
      payment.guest.toLowerCase().includes(query) ||
      payment.id.toLowerCase().includes(query) ||
      payment.bookingId.toLowerCase().includes(query);

    const matchesStatus =
      filter === "All" || payment.status === filter;

    return matchesSearch && matchesStatus;
  });

  const totalCollected = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.amount, 0);

  const failedCount = payments.filter(
    (payment) => payment.status === "Failed"
  ).length;

  function handleAddPayment(e) {
    e.preventDefault();

    const newPayment = {
      ...form,
      id: `PAY${Date.now().toString().slice(-6)}`,
      guest: form.guest.trim(),
      bookingId: form.bookingId.trim(),
      amount: Number(form.amount),
      status: "Pending",
    };

    setPayments((current) => [...current, newPayment]);

    setForm({
      guest: "",
      bookingId: "",
      date: new Date().toLocaleDateString("en-CA"),
      method: "M-Pesa",
      amount: "",
    });

    setShowForm(false);
  }

  function updateStatus(id, status) {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id ? { ...payment, status } : payment
      )
    );
  }

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Failed: "bg-red-100 text-red-700",
  };

  const methodIcons = {
    "M-Pesa": Smartphone,
    Card: CreditCard,
    Cash: Banknote,
    Bank: Wallet,
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Payment Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track hotel payments and transaction records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-700"
        >
          <Plus size={18} />
          Record Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Collected</p>
          <p className="mt-3 text-2xl font-bold text-green-600">
            KSh {totalCollected.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Payments marked as paid
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Pending Payments</p>
          <p className="mt-3 text-2xl font-bold text-amber-600">
            KSh {pendingAmount.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Awaiting confirmation
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Failed Transactions</p>
          <p className="mt-3 text-2xl font-bold text-red-600">
            {failedCount}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Transactions marked as failed
          </p>
        </div>
      </div>

      {/* New Payment Form */}
      {showForm && (
        <form
          onSubmit={handleAddPayment}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              Record a Payment
            </h3>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input
              required
              value={form.guest}
              onChange={(e) =>
                setForm({ ...form, guest: e.target.value })
              }
              placeholder="Guest name"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              required
              value={form.bookingId}
              onChange={(e) =>
                setForm({ ...form, bookingId: e.target.value })
              }
              placeholder="Booking ID"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              required
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <select
              value={form.method}
              onChange={(e) =>
                setForm({ ...form, method: e.target.value })
              }
              className="rounded-lg border border-slate-300 px-4 py-3"
            >
              <option>M-Pesa</option>
              <option>Card</option>
              <option>Cash</option>
              <option>Bank</option>
            </select>

            <input
              required
              type="number"
              min="1"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              placeholder="Amount (KSh)"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400"
            >
              Save Payment
            </button>
          </div>

          <p className="text-xs text-slate-500">
            New payments start as Pending. Mark a payment as Paid only
            after verifying that payment was actually received.
          </p>
        </form>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guest or transaction ID..."
            className="w-full py-3 text-sm outline-none"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h3 className="font-bold text-slate-800">
            Transaction History
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredPayments.length} of {payments.length} transactions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Guest</th>
                <th className="px-5 py-4">Booking ID</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Method</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => {
                const MethodIcon = methodIcons[payment.method] || CreditCard;

                return (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {payment.id}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {payment.guest}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {payment.bookingId}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {payment.date}
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-slate-600">
                        <MethodIcon size={17} />
                        {payment.method}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      KSh {payment.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[payment.status]}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {payment.status !== "Paid" && (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Have you verified that this payment was received?"
                              )
                            ) {
                              updateStatus(payment.id, "Paid");
                            }
                          }}
                          className="whitespace-nowrap rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-200"
                        >
                          Mark Paid
                        </button>
                      )}

                      {payment.status === "Paid" && (
                        <span className="text-xs text-green-700">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;