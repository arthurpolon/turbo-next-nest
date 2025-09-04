import { createAuthClient } from "better-auth/react";
import { BETTER_AUTH_URL } from "./config";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { organizationOptions } from "./organization";

export const authClient = createAuthClient({
  baseURL: BETTER_AUTH_URL,

  plugins: [adminClient(), organizationClient(organizationOptions)],
});
