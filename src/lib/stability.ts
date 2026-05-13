import { addDays, differenceInHours } from "date-fns";

export type Ingredient = {
  name: string;
  concentration?: number;
};

const ingredientShelfLife: Record<string, number> = {
  "Vitamin C": 14,
  Retinol: 30,
  AHA: 21,
  BHA: 21,
  "Hyaluronic Acid": 90,
  Niacinamide: 60,
  "Peptide Complex": 45,
};

export function calculateExpiry(ingredients: Ingredient[], mixedAt: Date) {
  let shortestLife = 90;

  for (const ingredient of ingredients) {
    const shelfLife = ingredientShelfLife[ingredient.name];

    if (shelfLife && shelfLife < shortestLife) {
      shortestLife = shelfLife;
    }
  }

  return addDays(mixedAt, shortestLife);
}

export function determineStatus(expiresAt: Date) {
  const now = new Date();

  const hoursRemaining = differenceInHours(expiresAt, now);

  if (hoursRemaining <= 0) {
    return "EXPIRED";
  }

  if (hoursRemaining <= 48) {
    return "DEGRADING";
  }

  return "OPTIMAL";
}

export function needsDiscardSoon(expiresAt: Date) {
  const now = new Date();

  const hoursRemaining = differenceInHours(expiresAt, now);

  return hoursRemaining <= 48 && hoursRemaining > 0;
}
