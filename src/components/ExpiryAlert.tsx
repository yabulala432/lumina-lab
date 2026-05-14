"use client";

function ExpiryAlert({ alerts }: { alerts: any[] }) {
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6">
      <h2 className="text-xl font-semibold text-red-400">
        Expiring Within 48 Hours
      </h2>

      <div className="mt-4 space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-zinc-900 rounded-2xl p-4">
            <p className="font-medium">{alert.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpiryAlert;
