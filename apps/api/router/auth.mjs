import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "slonik";

import { wrap } from "../utils/index.mjs";
import db from "../db.mjs";

export const router = express.Router();

export async function insertAccountIfNotExist({ email, passwordHash = null }) {
  const result = await db().one(sql.fragment`
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

  return result;
}

function signJWT(account) {
  const token = jwt.sign(account, appConfig.jwtSecret, {
    expiresIn: "12h",
  });
  return token;
}

router.post(
  "/signin",
  wrap(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const account = await db().one(
        sql.fragment`SELECT id, email, "passwordHash" FROM accounts WHERE email = ${email}`,
      );
      const accountData = {
        id: account.id,
        email: account.email,
      };
      if (account && (await bcrypt.compare(password, account.passwordHash))) {
        const jwtToken = signJWT(accountData);
        res.json({ jwtToken });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      log.error(error);
      res.status(401).json({ error: "Invalid email or password" });
    }
  }),
);

router.post(
  "/signup",
  wrap(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const account = await insertAccountIfNotExist({
        email,
        passwordHash,
      });
      const accountData = {
        id: account.id,
        email: account.email,
      };

      if (account.isNewAccount) {
        const jwtToken = signJWT(accountData);
        res.status(201).json({ jwtToken });
      } else {
        res.status(409).json({ error: "Account already exist" });
      }
    } catch (error) {
      log.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }),
);
