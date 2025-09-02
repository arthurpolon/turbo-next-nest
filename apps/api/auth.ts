import 'dotenv/config';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
  admin as adminPlugin,
  bearer,
  openAPI,
  organization,
} from 'better-auth/plugins';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ac, owner, admin, member } from './src/auth/permissions';

const authConfig = {
  database: drizzleAdapter(drizzle(process.env.DATABASE_URL!), {
    provider: 'pg',
  }),

  // basePath: BETTER_AUTH_BASE_PATH,

  emailAndPassword: {
    enabled: true,
  },
  telemetry: {
    enabled: false,
  },
  // trustedOrigins: TRUSTED_ORIGINS,
  plugins: [
    bearer(),
    openAPI(),
    adminPlugin(),
    organization({
      ac,
      roles: {
        member,
        admin,
        owner,
      },
    }),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig) as ReturnType<
  typeof betterAuth<typeof authConfig>
>;
