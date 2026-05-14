import { z } from "zod";

export const BatchSchema = z.object({
  name: z.string().min(3),
  phLevel: z.number().min(0).max(4),
  mixedAt: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      concentration: z.number().optional(),
    }),
  ),
});

export const TreatmentSchema = z.object({
  room: z.string().min(1),
  esthetician: z.string().min(2),
  batchId: z.string(),
});
