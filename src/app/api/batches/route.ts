import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateExpiry, determineStatus } from "@/lib/stability";
import { BatchSchema } from "@/lib/validators";

export async function GET() {
  try {
    const batches = await db.batch.findMany({
      include: {
        treatmentLogs: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(batches);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch batches" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = BatchSchema.parse(body);

    const mixedAt = new Date(validated.mixedAt);

    if (isNaN(mixedAt.getTime())) {
      return NextResponse.json(
        { error: "Invalid mixing date" },
        { status: 400 },
      );
    }

    const expiresAt = calculateExpiry(validated.ingredients, mixedAt);

    const status = determineStatus(expiresAt);

    const batch = await db.batch.create({
      data: {
        name: validated.name,
        ingredients: validated.ingredients,
        phLevel: validated.phLevel,
        mixedAt,
        expiresAt,
        status,
      },
    });

    return NextResponse.json(batch);
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Unable to create batch" },
      { status: 500 },
    );
  }
}
