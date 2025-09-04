import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { BETTER_AUTH_BASE_PATH, TRUSTED_ORIGINS } from "./config";
import {
  openAPI,
  admin as adminPlugin,
  organization,
} from "better-auth/plugins";
import { organizationOptions } from "./organization";
import Database from "@workspace/database";

const authConfig = {
  database: drizzleAdapter(Database, {
    provider: "pg",
  }),

  basePath: BETTER_AUTH_BASE_PATH,

  emailAndPassword: {
    enabled: true,
  },
  telemetry: {
    enabled: false,
  },
  trustedOrigins: TRUSTED_ORIGINS,
  plugins: [openAPI(), adminPlugin(), organization(organizationOptions)],
} satisfies BetterAuthOptions;

export type TAuthConfig = typeof authConfig;

export const auth = betterAuth(authConfig) as ReturnType<
  typeof betterAuth<TAuthConfig>
>;
