import bcrypt from "bcryptjs";
import { sql } from "slonik";

import db, { initializeDB } from "../db.mjs";

async function insertAccountIfNotExist({ email, passwordHash }) {
  const account = await db().one(sql.fragment`
    WITH inserted_user AS (
      INSERT INTO accounts(email, "passwordHash")
      VALUES (${email}, ${passwordHash})
      ON CONFLICT (email) DO NOTHING
      RETURNING *, true as "isNewAccount"
    ),
    existing_user AS (
      SELECT *, false as "isNewAccount" FROM accounts WHERE email = ${email}
    )
    SELECT * FROM inserted_user
    UNION ALL
    SELECT * FROM existing_user
    LIMIT 1
  `);

  return {
    id: account.id,
    email: account.email,
    isNewAccount: account.isNewAccount,
  };
}

async function insertWorkspaceIfNotExist({ name, ownerAccountId }) {
  const workspace = await db().one(sql.fragment`
    WITH inserted_workspace AS (
      INSERT INTO workspaces(name, "ownerAccountId")
      VALUES (${name}, ${ownerAccountId})
      ON CONFLICT (name, "ownerAccountId") DO NOTHING
      RETURNING *, true as "isNewWorkspace"
    ),
    existing_workspace AS (
      SELECT *, false as "isNewWorkspace" FROM workspaces WHERE name = ${name} AND "ownerAccountId" = ${ownerAccountId}
    )
    SELECT * FROM inserted_workspace
    UNION ALL
    SELECT * FROM existing_workspace
    LIMIT 1
  `);

  return workspace;
}

async function insertWorkspaceMembershipIfNotExist({
  accountId,
  workspaceId,
  role,
  invitedByAccountId,
}) {
  const workspaceMembership = await db().one(sql.fragment`
    WITH inserted_membership AS (
      INSERT INTO workspace_memberships("accountId", "workspaceId", role, "invitedByAccountId")
      VALUES (${accountId}, ${workspaceId}, ${role}, ${invitedByAccountId})
      ON CONFLICT ("accountId", "workspaceId") DO NOTHING
      RETURNING *, true as "isNewMembership"
    ),
    existing_membership AS (
      SELECT *, false as "isNewMembership" FROM workspace_memberships WHERE "accountId" = ${accountId} AND "workspaceId" = ${workspaceId}
    )
    SELECT * FROM inserted_membership
    UNION ALL
    SELECT * FROM existing_membership
    LIMIT 1
  `);

  return workspaceMembership;
}

async function seedData() {
  try {
    const accountsSeeds = [
      { email: "testAccount@ailab.internal", password: "password" },
      { email: "testAccount2@ailab.internal", password: "password2" },
    ];

    const accounts = await Promise.all(
      accountsSeeds.map(async (accountSeed) => {
        const passwordHash = await bcrypt.hash(accountSeed.password, 10);
        return insertAccountIfNotExist({
          email: accountSeed.email,
          passwordHash,
        });
      }),
    );

    await Promise.all(
      accounts.map(async (account) => {
        const workspace = await insertWorkspaceIfNotExist({
          name: `${account.email}'s workspace`,
          ownerAccountId: account.id,
        });

        await insertWorkspaceMembershipIfNotExist({
          accountId: account.id,
          workspaceId: workspace.id,
          role: "owner",
          invitedByAccountId: null,
        });
      }),
    );
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

async function applySeeds() {
  const dbPool = await initializeDB();

  try {
    await seedData();
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await dbPool.end();
    process.exit();
  }
}

applySeeds();
