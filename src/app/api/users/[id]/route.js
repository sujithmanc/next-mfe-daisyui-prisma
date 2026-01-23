import prisma from "@/lib/prisma";

// GET user by ID
export async function GET(_, { params }) {
    const idStr = await params;
    console.info("Fetching user with ID:", idStr.id);
    const user = await prisma.users.findUnique({ where: { id: Number(idStr.id) } });

    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
}

// UPDATE user by ID
export async function PUT(req, { params }) {

    const idStr = await params;
    console.info("Fetching user with ID:", idStr.id);
    const id = Number(idStr.id);
    const { username, email } = await req.json();

    try {
        const updated = await prisma.users.update({
            where: { id },
            data: { username, email },
        });
        return Response.json(updated);
    } catch (err) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }
}

// DELETE user by ID
export async function DELETE(_, { params }) {
    const idStr = await params;
    console.info("Fetching user with ID:", idStr.id);
    const id = Number(idStr.id);

    try {
        await prisma.users.delete({ where: { id } });
        return Response.json({ message: "User deleted successfully" });
    } catch (err) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }
}