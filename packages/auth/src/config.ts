import "dotenv/config";

export const BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";
export const BETTER_AUTH_BASE_PATH =
  process.env.BETTER_AUTH_BASE_PATH || "/api/better-auth";

export const TRUSTED_ORIGINS = process.env.TRUSTED_ORIGINS?.split(",") || [
  "http://localhost:3001",
];
