"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  PlusCircle,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"; // ✅ lucide-react icons
import { API_BASE } from "@/lib/server";

// Fetch all users
const fetchUsers = async () => {
  const res = await fetch(`${API_BASE}/api/users`);
  return res.json();
};

export default function UserHomePage() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => {
      await fetch(`${API_BASE}/api/users/${id}`, { method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      {/* Create New Button */}
      <h1 className="text-2xl font-bold mb-4">Users List{window.location.origin}</h1>
      <Link href="/users/create" className="btn btn-primary mb-4 flex items-center gap-2">
        <PlusCircle size={18} /> Create New
      </Link>

      {/* User Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{user.username}</h2>
              <p>{user.email}</p>
              <div className="card-actions justify-end flex gap-2">
                {/* View Button */}
                <Link href={`/users/${user.id}`} className="btn btn-info btn-sm flex items-center gap-1">
                  <Eye size={16} /> View
                </Link>

                {/* Edit Button */}
                <Link href={`/users/${user.id}/edit`} className="btn btn-warning btn-sm flex items-center gap-1">
                  <Pencil size={16} /> Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteUser.mutate(user.id)}
                  className="btn btn-error btn-sm flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}