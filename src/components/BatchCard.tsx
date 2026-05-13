"use client";

import { format } from "date-fns";

export default function BatchCard({ batch }: { batch: any }) {
  const statusColor = {
    OPTIMAL: "bg-emerald-500",
    DEGRADING: "bg-yellow-500",
    EXPIRED: "bg-red-500",
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{batch.name}</h3>
          <p className="text-zinc-400 mt-1">pH {batch.phLevel}</p>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-sm font-medium text-black ${statusColor[batch.status as keyof typeof statusColor]}`}
        >
          {batch.status}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-500">Mixed</p>
          <p>{format(batch.mixedAt, "PPpp")}</p>
        </div>

        <div>
          <p className="text-zinc-500">Expires</p>
          <p>{format(batch.expiresAt, "PPpp")}</p>
        </div>
      </div>
    </div>
  );
}
