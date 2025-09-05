import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

export const createDatabase = ({ databaseUrl }: { databaseUrl: string }) =>
  drizzle(databaseUrl, { schema });
