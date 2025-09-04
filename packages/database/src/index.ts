import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const Database = drizzle(process.env.DATABASE_URL!, { schema });

export default Database;
