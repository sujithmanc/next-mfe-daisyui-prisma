"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const API_BASE = window.location.origin; 

export default function CreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: async (newUser) => {
      await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      router.push("/users");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    createUser.mutate({ username, email });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" className="input input-bordered w-full" />
        <input name="email" placeholder="Email" className="input input-bordered w-full" />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">Create</button>
          <button type="button" onClick={() => router.back()} className="btn">Back</button>
        </div>
      </form>
    </div>
  );
}