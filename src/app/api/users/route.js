import prisma from "@/lib/prisma";
import { z } from "zod";
import { withCors } from "@/lib/cors";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// GET all users
export const GET = withCors(async () => {
  const users = await prisma.users.findMany(); // ✅ use prisma.user not prisma.users
  return Response.json(users);
});

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email").optional(),
});

export const POST = withCors(async (req) => {
  try {
    const body = await req.json();
    const parsed = userSchema.parse(body);

    const user = await prisma.users.create({ data: parsed });
    return Response.json(user, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        { errors: err.issues.map(issue => ({ field: issue.path[0], message: issue.message })) },
        { status: 400 }
      );
    }
    console.error(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
});