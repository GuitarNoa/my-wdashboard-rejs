import React from "react";


export default function BasicTables() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  ];

  return (
    <main>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Basic Tables</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-white hover:bg-slate-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                      : "bg-slate-50 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }
                >
                  <td className="py-3 px-6">{user.id}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <td className="py-3 px-6" colSpan={4}>
                  Total Users: {users.length}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <h2 className="text-xl font-semibold mb-6 mt-10">Accent table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-teal-700">
              <tr className="text-white">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-white hover:bg-slate-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                      : "bg-slate-50 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }
                >
                  <td className="py-3 px-6">{user.id}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <td className="py-3 px-6" colSpan={4}>
                  Total Users: {users.length}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
