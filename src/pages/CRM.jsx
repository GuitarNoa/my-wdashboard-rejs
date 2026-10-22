// CRM.jsx
import { useEffect, useId, useRef, useState } from "react";

const EMPTY_FORM = { name: "", email: "", phone: "", status: "Active" };

function StatCard({ label, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <div className={`${colors[color]} rounded-lg p-4 text-center`}>
      <p className="text-sm font-medium mb-1">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => dialog.close(); }, []);
  return (
    <dialog ref={ref} aria-labelledby={titleId} onCancel={onClose} className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-950/50 dark:bg-gray-800 dark:text-slate-100">
      <div className="w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id={titleId} className="text-base font-semibold text-gray-800 dark:text-slate-100">{title}</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-slate-300 transition"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </dialog>
  );
}

export default function CRM() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "0812345678",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0898765432",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "0823456789",
      status: "Active",
    },
  ]);

  const [modal, setModal] = useState(null); // null | { mode: "add" | "edit", data: {} }
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");

  // Form handlers
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setModal({ mode: "add" });
  };
  const openEdit = (customer) => {
    setForm(customer);
    setFormError("");
    setModal({ mode: "edit" });
  };
  const closeModal = () => setModal(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) { setFormError("Please enter a customer name."); return; }
    if (!form.name.trim() || !form.email.trim()) return;
    if (modal.mode === "add") {
      const newId = customers.length
        ? Math.max(...customers.map((c) => c.id)) + 1
        : 1;
      setCustomers((prev) => [...prev, { ...form, id: newId }]);
    } else {
      setCustomers((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    }
    setNotice("Customer updated for this visit. Changes are not saved to a server.");
    closeModal();
  };

  // Delete with confirmation
  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    setNotice("Customer removed from this demo.");
  };

  const activeCount = customers.filter((c) => c.status === "Active").length;
  const inactiveCount = customers.filter((c) => c.status === "Inactive").length;

  const filtered = customers.filter(customer => [customer.name, customer.email, customer.phone].some(value => value.toLowerCase().includes(search.trim().toLowerCase())));

  const inputCls =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white dark:bg-gray-900 dark:border-slate-600 focus:ring-2 focus:ring-teal-500 transition";
  const labelCls = "block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1";

  return (
    <main>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">CRM</h1>
            <p className="text-sm text-gray-400">Manage your customers · Sample records for this visit</p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Add Customer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Total Customers"
            value={customers.length}
            color="blue"
          />
          <StatCard label="Active" value={activeCount} color="green" />
          <StatCard label="Inactive" value={inactiveCount} color="red" />
        </div>

        <div className="mb-4"><label className="text-sm font-medium" htmlFor="customer-search">Search customers</label><input id="customer-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Name, email or phone" className={inputCls + " mt-2 sm:max-w-sm block"} /></div>
        {notice && <p role="status" className="mb-4 rounded-xl bg-teal-50 p-3 text-sm text-teal-800 dark:bg-teal-950 dark:text-teal-200">{notice}</p>}
        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-gray-900">
                  {["ID", "Name", "Email", "Phone", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-gray-400 text-sm"
                    >
                      No matching customers. Try another search or add a customer.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-gray-50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="py-3 px-4 text-gray-400">{c.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-800 dark:text-slate-100">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-gray-500 dark:text-slate-400">{c.email}</td>
                      <td className="py-3 px-4 text-gray-500 dark:text-slate-400">{c.phone}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => openEdit(c)}
                            className="text-xs text-blue-500 hover:text-blue-700 font-medium transition"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => confirmDelete(c.id)}
                            className="text-xs text-red-400 hover:text-red-600 font-medium transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <Modal
          title={modal.mode === "add" ? "Add Customer" : "Edit Customer"}
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label htmlFor="customer-name" className={labelCls}>
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="customer-name"
                required maxLength={120}
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className={inputCls}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="customer-email" className={labelCls}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="customer-email"
                required maxLength={120}
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                className={inputCls}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="customer-phone" className={labelCls}>Phone</label>
              <input
                id="customer-phone"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className={inputCls}
                placeholder="08xxxxxxxx"
              />
            </div>
            <div>
              <label htmlFor="customer-status" className={labelCls}>Status</label>
              <select
                id="customer-status"
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className={inputCls}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          {formError && <p role="alert" className="mt-3 text-sm text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!form.name.trim() || !form.email.trim()}
              className="px-4 py-2 text-sm bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white rounded-lg transition"
            >
              {modal.mode === "add" ? "Add" : "Save"}
            </button>
          </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <Modal title="Delete Customer" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-600 dark:text-slate-300 mb-5">
            Are you sure you want to delete this customer? This cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}
