"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

const API_BASE = window.location.origin; 

async function fetchUser(id) {
  const res = await fetch(`${API_BASE}/api/users/${id}`);
  return res.json();
}

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => fetchUser(params.id),
  });

  const updateUser = useMutation({
    mutationFn: async (updatedUser) => {
      await fetch(`${API_BASE}/api/users/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      router.push("/users");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    updateUser.mutate({ username, email });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          defaultValue={user.username}
          className="input input-bordered w-full"
        />
        <input
          name="email"
          defaultValue={user.email}
          className="input input-bordered w-full"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-warning">Update</button>
          <button type="button" onClick={() => router.back()} className="btn">Back</button>
        </div>
      </form>
    </div>
  );
}