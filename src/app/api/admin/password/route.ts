import { NextResponse } from "next/server";
import { changeAdminPassword, getSession } from "@/lib/auth";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const currentPassword = String(body.currentPassword || "");
  const newPassword = String(body.newPassword || "");
  const confirmPassword = String(body.confirmPassword || "");

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "too_short" }, { status: 400 });
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "mismatch" }, { status: 400 });
  }

  const result = await changeAdminPassword(
    session.userId,
    currentPassword,
    newPassword,
  );

  if (!result.ok) {
    if (result.error === "invalid_current") {
      return NextResponse.json({ error: "invalid_current" }, { status: 400 });
    }
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
