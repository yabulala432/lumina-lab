# Lumina Lab

A clinical serum stability and potency tracker built for estheticians and skincare labs. Lumina Lab helps you manage serum batches, monitor ingredient degradation in real time, and log treatments - so nothing expired ever reaches a client.

---

## What It Does

Serums mixed from active ingredients like Vitamin C, Retinol, or AHAs have short and variable shelf lives. Lumina Lab tracks each batch from the moment it's mixed, automatically calculates its expiry based on its ingredient profile, and flags batches that are degrading or expired before they're used in a treatment.

**Core features**

- **Batch management** - Create batches with a name, pH level, mix date, and primary ingredient. Expiry is calculated automatically.
- **Stability engine** - Each ingredient has a known shelf life. The batch expiry is set to the shortest shelf life among its ingredients.
- **Status tracking** - Batches are automatically classified as `OPTIMAL`, `DEGRADING` (within 48 hours of expiry), or `EXPIRED`.
- **Expiry alerts** - A dedicated alert panel surfaces any batch expiring within the next 48 hours.
- **Treatment logging** - Log which batch was used, in which room and by which esthetician.
- **REST API** - All data is accessible via a clean Next.js API layer.

---

## Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Framework      | Next.js 16 (App Router)      |
| Language       | TypeScript 6                 |
| Database       | SQLite (via Prisma + PGlite) |
| ORM            | Prisma 7                     |
| UI             | React 19, Tailwind CSS 3     |
| Forms          | React Hook Form              |
| Validation     | Zod 4                        |
| Data fetching  | TanStack Query v5            |
| Icons          | Lucide React                 |
| Date utilities | date-fns 4                   |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Database setup

Run the initial migration to create the SQLite database:

```bash
pnpm prisma:migrate
```

This creates `dev.db` in the project root and generates the Prisma client.

### Development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env` file in the project root. The app uses SQLite locally so no database URL is required by default, but you can configure the following:

```env
# Add any environment-specific overrides here
```

---

## Project Structure

```
src/
    |______ app/
    |       |______ api
    |       |   |    |______ batches/                   # GET, POST /api/batches
    |       |   |    |        |______ [id]/             # DELETE /api/batches/:id
    |       |   |    |______ treatments/                # POST /api/treatments
    |       |   |    |______ alerts                     # GET /api/alerts (expiring soon)
    |   |______ dashboard/                      # Main dashboard page
    |   |______ layout.tsx
    |   |______ page.tsx
    |______ components/
    |       |______ BatchCard.tsx               # Displays a single batch with status badge
    |       |______ BatchForm.tsx               # Form to create a new batch
    |       |______ ExpiryAlert.tsx             # Alert panel for batches expiring within 48h
    |______ lib/
    |       |______ db.ts                       # Prisma client singleton
    |       |______ stability.ts                # Expiry calculation and status logic
    |       |______ validators.ts               # Zod schemas for API input validation
    prisma/
    |______ schema.prisma                       # Database schema
```

---

## Data Models

### Batch

| Field         | Type          | Description                            |
| ------------- | ------------- | -------------------------------------- |
| `id`          | String (cuid) | Unique identifier                      |
| `name`        | String        | Batch name                             |
| `ingredients` | JSON          | Array of `{ name, concnetration? }`    |
| `phLevel`     | Float         | pH of the serum (0-4)                  |
| `mixedAt`     | DateTime      | When the batch was prepared            |
| `expiresAt`   | DateTime      | Calculated from ingredient shelf lives |
| `status`      | Enum          | `OPTIMAL`, `DEGRADING`, or `EXPIRED`   |

### TreatmentLog

| Field         | Type          | Description                              |
| ------------- | ------------- | ---------------------------------------- |
| `id`          | String (cuid) | Unique identifier                        |
| `room`        | String        | Treatment room                           |
| `esthetician` | String        | Staff member who performed the treatment |
| `usedAt`      | DateTime      | Timestamp of use                         |
| `batchId`     | String        | Reference to the batch used              |

## Stability Engine

The core logic lives in `src/lib/stability.ts`.

**Ingredient shelf lives (days from mix date):**

| Ingredient      | Shelf Life |
| --------------- | ---------- |
| Vitamin C       | 14 days    |
| Retinol         | 30 days    |
| AHA             | 21 days    |
| BHA             | 21 days    |
| Hyaluronic Acid | 90 days    |
| Niacinamide     | 60 days    |
| Peptide Complex | 45 days    |

When a batch is created, `calculateExpiry()` finds the ingredient with the shortest shelf life and sets `expiresAt` accordingly. `determineStatus()` then classifies the batch:

- **OPTIMAL** - more than 48 hours remaining
- **DEGRADING** - 1-48 hours remianing
- **EXPIRED** - past expiry

---

## API Reference

### `GET /api/batches`

Returns all batches ordered by creation date.

### `POST /api/batches`

Creates a new batch. Expiry and status are calculated server-side.

**Body:**

```json
{
  "name": "Vitamin C Brightening Serum",
  "phLevel": 3.5,
  "ingredients": [{ "name": "Vitamin C", "concentration": 15 }]
}
```

### `DELETE /api/batches/:id`

Deletes a batch by ID.

### `POST /api/treatments`

Logs a treatment against a batch.

**Body:**

```json
{
  "batchId": "clxyz...",
  "room": "Room 3",
  "esthetician": "Sara M."
}
```

### `GET /api/alerts`

Returns all batches with status `DEGRADING` - i.e., expiring within 48 hours.

---

## Scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `pnpm dev`             | Start the development server                    |
| `pnpm build`           | Generate Prisma client and build for production |
| `pnpm start`           | Start the production server                     |
| `pnpm prisma:migrate`  | Run database migrations                         |
| `pnpm prisma:generate` | Regenerate the Prisma client                    |

---

## License

Private. All rights reserved.
