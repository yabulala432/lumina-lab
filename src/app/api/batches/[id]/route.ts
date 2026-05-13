import { db } from "@/lib/db";
import { determineStatus } from "@/lib/stability";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const batch = await db.batch.findUnique({
      where: {
        id: params.id,
      },
      include: {
        treatmentLogs: true,
      },
    });

    if (!batch) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }

    const updatedStatus = determineStatus(batch.expiresAt);

    if (updatedStatus !== batch.status) {
      await db.batch.update({
        where: {
          id: batch.id,
        },
        data: {
          status: updatedStatus as any,
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error loading batch" }, { status: 500 });
  }
}
