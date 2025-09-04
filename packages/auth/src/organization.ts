import {
  adminAc,
  memberAc,
  ownerAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";
import { createAccessControl } from "better-auth/plugins/access";
import { OrganizationOptions } from "better-auth/plugins";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({
  project: ["create"],
  ...memberAc.statements,
});

const admin = ac.newRole({
  project: ["create", "update"],
  ...adminAc.statements,
});

const owner = ac.newRole({
  project: ["create", "update", "delete"],
  ...ownerAc.statements,
});

export const organizationOptions = {
  ac,
  roles: {
    owner,
    admin,
    member,
  },
} satisfies OrganizationOptions;
