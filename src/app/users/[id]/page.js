"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const getUser = async (id) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to load user");
  return res.json();
};

export default function ViewUser() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  const deleteUser = useMutation({
    mutationFn: async () => {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      router.push("/users");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <span>{error.message || "Something went wrong"}</span>
        </div>
        <button className="btn mt-4" onClick={() => router.back()}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="card bg-base-200 shadow-md max-w-xl mx-auto">
        <div className="card-body">
          <h2 className="card-title">{user.username}</h2>
          <p className="text-sm opacity-70">{user.email}</p>
          <div className="divider" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold">ID</div>
            <div>{user.id}</div>
            <div className="font-semibold">Created</div>
            <div>{new Date(user.created_at).toLocaleString()}</div>
          </div>

          <div className="card-actions justify-between mt-4">
            <button className="btn" onClick={() => router.back()}>
              Back
            </button>
            <div className="flex gap-2">
              <Link href={`/users/${user.id}/edit`} className="btn btn-warning">
                Edit
              </Link>
              <button
                onClick={() => deleteUser.mutate()}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}