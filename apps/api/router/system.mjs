import express from "express";

import { redisClient } from "../redisClient.mjs";
import { pushChatMessage } from "../utils/chat.mjs";
import { wrap } from "../utils/index.mjs";

export const router = express.Router();

router.get(
  "/healthcheck",
  wrap(async (req, res) => {
    await redisClient.set("@ailab-healthcheck", +new Date());
    const timestamp = await redisClient.get("@ailab-healthcheck");
    log.debug(`timestamp value from redis: ${timestamp}`);
    res.sendStatus(200);
  }),
);

router.post(
  "/commit-callback",
  wrap(async (req, res) => {
    log.info("commit-callback!");
    const { ref, after } = req.body;
    if (ref === "refs/heads/develop") {
      await redisClient.set(
        `@ailab-${process.env.API_HOST}-deploy-commit`,
        after,
      );
      await pushChatMessage(
        "msg-to-ci-cd-chat",
        `🎣 Catch deploy callback commit - `,
        "<code>",
        after,
        "</a>",
        "</code>",
      );
    }
    res.sendStatus(200);
  }),
);
