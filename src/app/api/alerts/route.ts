import { db } from "@/lib/db";
import { needsDiscardSoon } from "@/lib/stability";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const batches = await db.batch.findMany();

    const alerts = batches.filter((batch) => needsDiscardSoon(batch.expiresAt));

    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch alerts" },
      { status: 500 },
    );
  }
}
