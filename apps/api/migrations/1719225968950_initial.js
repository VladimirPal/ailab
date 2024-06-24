const { PgLiteral } = require("node-pg-migrate");

exports.shorthands = {
  id: {
    type: "uuid",
    primaryKey: true,
    default: new PgLiteral("uuid_generate_v4()"),
  },
  shortId: {
    type: "text",
    notNull: true,
    unique: true,
    default: new PgLiteral("id_encode((random() * 1000000000)::int)"),
  },
  textRequired: { type: "text", notNull: true },
  createdAt: {
    type: "timestamp",
    notNull: true,
    default: new PgLiteral("current_timestamp"),
  },
};

exports.up = (pgm) => {
  pgm.createExtension("uuid-ossp", { ifNotExists: true });

  pgm.createTable("accounts", {
    id: "id",
    email: { ...exports.shorthands.textRequired, unique: true },
    passwordHash: { type: "text" },

    createdAt: "createdAt",
  });

  pgm.createTable("workspaces", {
    id: "id",
    shortId: "shortId",
    name: "textRequired",

    ownerAccountId: {
      type: "uuid",
      notNull: true,
      references: "accounts(id)",
      onDelete: "CASCADE",
    },
    createdAt: "createdAt",
    isDeleted: { type: "boolean", default: false },
  });

    pgm.addConstraint("workspaces", "unique_workspace_name", {
      unique: ["ownerAccountId", "name"],
    });

    pgm.createTable("workspace_memberships", {
    id: "id",
    accountId: {
      type: "uuid",
      notNull: true,
      references: "accounts(id)",
      onDelete: "CASCADE",
    },
    workspaceId: {
      type: "uuid",
      notNull: true,
      references: "workspaces(id)",
      onDelete: "CASCADE",
    },
    role: {
      type: "text",
      notNull: true,
    },
    invitedByAccountId: {
      type: "uuid",
      notNull: false,
      references: "accounts(id)",
      onDelete: "CASCADE",
    },
    createdAt: "createdAt",
  });

  pgm.addConstraint("workspace_memberships", "unique_account_workspace", {
    unique: ["accountId", "workspaceId"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("accounts");
  pgm.dropTable("workspaces");
  pgm.dropTable("workspace_memberships");
};
