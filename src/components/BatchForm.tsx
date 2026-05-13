"use client";

import { useState } from "react";

export default function BatchForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const payload = {
      name: form.batchName.value,
      phLevel: Number(form.phLevel.value),
      mixedAt: form.mixedAt.value,
      ingredients: [
        {
          name: form.ingredient.value,
        },
      ],
    };

    const res = await fetch("/api/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      form.reset();
      onSuccess();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">New Batch</h2>

      <input
        name="batchName"
        placeholder="Batch Name"
        className="w-full bg-zinc-800 rounded-xl p-3"
      />

      <input
        name="ingredient"
        placeholder="Primary Ingredient"
        className="w-full bg-zinc-800 rounded-xl p-3"
      />

      <input
        type="number"
        step="0.1"
        name="phLevel"
        placeholder="pH Level"
        className="w-full bg-zinc-800 rounded-xl p-3"
      />

      <input
        type="datetime-local"
        name="mixedAt"
        className="w-full bg-zinc-800 rounded-xl p-3"
      />

      <button
        disabled={loading}
        className="w-full bg-white text-black rounded-xl p-3 font-medium"
      >
        {loading ? "Saving...." : "Create Batch"}
      </button>
    </form>
  );
}
