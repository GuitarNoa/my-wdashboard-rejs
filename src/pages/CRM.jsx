import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

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

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Customer
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">Total Customers</h2>
            <p className="text-2xl font-bold">{customers.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">Active</h2>
            <p className="text-2xl font-bold">
              {customers.filter((c) => c.status === "Active").length}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold">Inactive</h2>
            <p className="text-2xl font-bold">
              {customers.filter((c) => c.status === "Inactive").length}
            </p>
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{customer.id}</td>
                  <td className="py-2 px-4">{customer.name}</td>
                  <td className="py-2 px-4">{customer.email}</td>
                  <td className="py-2 px-4">{customer.phone}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        customer.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
