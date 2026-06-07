// CRM.jsx
import { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
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

  // Form handlers
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal({ mode: "add" });
  };
  const openEdit = (customer) => {
    setForm(customer);
    setModal({ mode: "edit" });
  };
  const closeModal = () => setModal(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (modal.mode === "add") {
      const newId = customers.length
        ? Math.max(...customers.map((c) => c.id)) + 1
        : 1;
      setCustomers((prev) => [...prev, { ...form, id: newId }]);
    } else {
      setCustomers((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    }
    closeModal();
  };

  // Delete with confirmation
  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  const activeCount = customers.filter((c) => c.status === "Active").length;
  const inactiveCount = customers.filter((c) => c.status === "Inactive").length;

  const inputCls =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition";
  const labelCls = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <DefaultLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">CRM</h1>
            <p className="text-sm text-gray-400">Manage your customers</p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Add Customer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Total Customers"
            value={customers.length}
            color="blue"
          />
          <StatCard label="Active" value={activeCount} color="green" />
          <StatCard label="Inactive" value={inactiveCount} color="red" />
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["ID", "Name", "Email", "Phone", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-gray-400 text-sm"
                    >
                      No customers yet — add one to get started.
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 text-gray-400">{c.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-gray-500">{c.email}</td>
                      <td className="py-3 px-4 text-gray-500">{c.phone}</td>
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
          <div className="space-y-3">
            <div>
              <label className={labelCls}>
                Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className={inputCls}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className={labelCls}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                className={inputCls}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className={inputCls}
                placeholder="08xxxxxxxx"
              />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select
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
          <div className="flex justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!form.name.trim() || !form.email.trim()}
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white rounded-lg transition"
            >
              {modal.mode === "add" ? "Add" : "Save"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <Modal title="Delete Customer" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-600 mb-5">
            Are you sure you want to delete this customer? This cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
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
    </DefaultLayout>
  );
}
