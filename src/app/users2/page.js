// app/users2/page.js
import React from "react";
import { headers } from "next/headers";
import { API_BASE } from "@/lib/server";

// Prevent static prerendering during build (avoids ECONNREFUSED to localhost)
export const dynamic = "force-dynamic";

export default async function UserDataPage() {
  // Build API base from request headers (server-side only)
  const hdrs = headers();
  const host = hdrs.get("host") || "localhost:3000";
  const proto = hdrs.get("x-forwarded-proto") || "http";

  let users = [];

  try {
    // Server-side fetch using the dynamically detected base
    const res = await fetch(`${API_BASE}/api/users`, {
      // ensure fresh data per request; adjust caching as needed
      cache: "no-store",
    });

    if (!res.ok) {
      // Log and fallback if API returns non-2xx
      console.error("Users API returned non-OK:", res.status, await res.text());
    } else {
      users = await res.json();
    }
  } catch (err) {
    // Handle network errors (e.g., ECONNREFUSED) gracefully
    console.error("Failed to fetch users on server:", err);
    users = [];
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {users.length === 0 ? (
        <div className="text-sm text-gray-600">No users available</div>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(user.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}