import React, { useState, useMemo } from "react";


export default function DataTables() {
  const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "Editor",
    },
    { id: 6, name: "Eva Green", email: "eva@example.com", role: "Admin" },
    { id: 7, name: "Frank Harris", email: "frank@example.com", role: "User" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Handle sorting
  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  // Handle search
  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        u.email.toLowerCase().includes(search.trim().toLowerCase()) ||
        u.role.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, sortedUsers]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    setDeleted(users.find(user => user.id === id));
    setUsers(users.filter((u) => u.id !== id));
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">DataTables</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            aria-label="Search users"
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-gray-800 px-3 py-2 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {deleted && <p role="status" className="mb-4 rounded-xl bg-teal-50 p-3 text-sm text-teal-800 dark:bg-teal-950 dark:text-teal-200">User removed from this demo. <button type="button" className="font-semibold underline" onClick={() => { setUsers(current => [...current, deleted].sort((a, b) => a.id - b.id)); setDeleted(null); }}>Undo</button></p>}
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                {["id", "name", "email", "role"].map((key) => (
                  <th
                    key={key}
                    className="py-3 px-6 text-left cursor-pointer"
                    scope="col"
                    aria-sort={sortConfig.key === key ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button type="button" className="flex items-center gap-2" onClick={() => requestSort(key)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key
                      ? sortConfig.direction === "asc"
                        ? " ▲"
                        : " ▼"
                      : ""}
                    </button>
                  </th>
                ))}
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 && <tr><td colSpan={5} className="p-8 text-center">No users found. Try another search.</td></tr>}
              {paginatedUsers.map((user, index) => (
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
                  <td className="py-3 px-6 space-x-2">
                    <button
                      className="text-red-500 hover:underline"
                      aria-label={"Delete " + user.name}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap gap-3 justify-between mt-4">
          <button
            disabled={page === 1}
            onClick={() => setCurrentPage(page - 1)}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                : "bg-teal-700 text-white hover:bg-teal-800"
            }`}
          >
            Previous
          </button>
          <span className="self-center">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                : "bg-teal-700 text-white hover:bg-teal-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
