"use client";

import { useEffect, useState } from "react";
import BatchForm from "@/components/BatchForm";
import BatchCard from "@/components/BatchCard";
import ExpiryAlert from "@/components/ExpiryAlert";

export default function DashboardPage() {
  const [batches, setBatches] = useState([]);
  const [alerts, setAlerts] = useState([]);

  async function loadData() {
    const batchRes = await fetch("/api/batches");
    const batchData = await batchRes.json();

    const alertRes = await fetch("/api/alerts");
    const alertData = await alertRes.json();

    console.log({ batchData });
    setBatches(batchData);
    setAlerts(alertData);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Lumina Lab</h1>
          <p className="text-zinc-400 mt-2">Clinical Serum Stability Tracker</p>
        </div>
      </div>

      <ExpiryAlert alerts={alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div>
          <BatchForm onSuccess={loadData} />
        </div>

        <div className="lg:col-span-2 grid gap-4">
          {batches.length &&
            batches.map((batch: any) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
        </div>
      </div>
    </main>
  );
}
