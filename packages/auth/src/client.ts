import { createAuthClient as createBetterAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { organizationOptions } from "./organization";

export const createAuthClient = ({
  basePath,
  baseURL,
}: {
  baseURL: string;
  basePath: string;
}) =>
  createBetterAuthClient({
    baseURL: baseURL + basePath,

    plugins: [adminClient(), organizationClient(organizationOptions)],
  });
