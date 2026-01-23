import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const [rows] = await pool.query("SELECT * FROM users");
  return NextResponse.json(rows);
}

export async function POST(request) {
  const { username, email } = await request.json();
  const [result] = await pool.query(
    "INSERT INTO users (username, email) VALUES (?, ?)",
    [username, email]
  );
  return NextResponse.json({ id: result.insertId, username, email });
}
