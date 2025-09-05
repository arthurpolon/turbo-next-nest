import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbPackagePath = '../../packages/database';

export default defineConfig({
  schema: dbPackagePath + '/src/schema.ts',
  out: dbPackagePath + '/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
