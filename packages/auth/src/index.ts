import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  openAPI,
  admin as adminPlugin,
  organization,
} from "better-auth/plugins";
import { organizationOptions } from "./organization";

export const createAuth = ({
  drizzleInstance,
  basePath,
  baseURL,
  secret,
  trustedOrigins,
}: {
  drizzleInstance: Parameters<typeof drizzleAdapter>[0];

  secret: string;
  baseURL: string;
  basePath: string;

  trustedOrigins?: string[];
}) => {
  const authConfig = {
    database: drizzleAdapter(drizzleInstance, {
      provider: "pg",
    }),

    secret,
    baseURL,
    basePath,

    emailAndPassword: {
      enabled: true,
    },
    telemetry: {
      enabled: false,
    },
    trustedOrigins,
    plugins: [openAPI(), adminPlugin(), organization(organizationOptions)],
  } satisfies BetterAuthOptions;

  return betterAuth(authConfig) as ReturnType<
    typeof betterAuth<typeof authConfig>
  >;
};
