import React, { useState } from "react";
import { TbTrash, TbSearch } from "react-icons/tb";
import { Helmet } from "react-helmet-async";

/**
 * ErrorDashboard Component
 * Displays application errors logged in localStorage.
 */
const ErrorDashboard = () => {
  // Use lazy initializer to avoid sync setState in effect
  const [errors, setErrors] = useState(() => {
    try {
      const raw = localStorage.getItem("app_errors") || "[]";
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [query, setQuery] = useState("");

  const refresh = () => {
    try {
      const raw = localStorage.getItem("app_errors") || "[]";
      setErrors(JSON.parse(raw));
    } catch {
      setErrors([]);
    }
  };

  const clearAll = () => {
    if (!window.confirm("Clear all logged errors?")) return;
    localStorage.removeItem("app_errors");
    setErrors([]);
  };

  const deleteEntry = (id) => {
    const filtered = errors.filter((e) => e.id !== id);
    localStorage.setItem("app_errors", JSON.stringify(filtered));
    setErrors(filtered);
  };

  const filtered = errors.filter((e) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (e.message && e.message.toLowerCase().includes(q)) ||
      (e.url && e.url.toLowerCase().includes(q)) ||
      (e.stack && e.stack.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-6">
      <Helmet>
        <title>Error Dashboard</title>
      </Helmet>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Error Dashboard</h2>
        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-ghost" onClick={refresh}>Refresh</button>
          <button className="btn btn-sm btn-error" onClick={clearAll}>Clear All</button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="input-group w-full">
            <input
              placeholder="Search by message, url or stack"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered w-full"
            />
            <button className="btn btn-square" onClick={() => setQuery("")}>
              <TbSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>When</th>
              <th>Message</th>
              <th>URL</th>
              <th className="w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-sm text-neutral-500">No errors logged</td>
              </tr>
            )}
            {filtered.map((err) => (
              <tr key={err.id}>
                <td className="text-xs">{new Date(err.time).toLocaleString()}</td>
                <td>
                  <div className="font-medium">{err.message}</div>
                  <pre className="text-xs whitespace-pre-wrap max-h-24 overflow-auto mt-1 bg-base-200 p-2 rounded">{err.stack}</pre>
                </td>
                <td className="text-sm break-all">{err.url}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-ghost" onClick={() => { window.alert(err.stack || err.message); }}>View</button>
                    <button className="btn btn-sm btn-error" onClick={() => deleteEntry(err.id)}><TbTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErrorDashboard;
