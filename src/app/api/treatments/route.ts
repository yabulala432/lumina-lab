import { db } from "@/lib/db";
import { TreatmentSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = TreatmentSchema.parse(body);

    const batch = await db.batch.findUnique({
      where: {
        id: validated.batchId,
      },
    });

    if (!batch) {
      return NextResponse.json(
        { error: "Batch does not exist" },
        { status: 404 },
      );
    }

    const treatment = await db.treatmentLog.create({
      data: validated,
    });

    return NextResponse.json(treatment);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create treatment log" },
      { status: 500 },
    );
  }
}
