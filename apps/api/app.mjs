import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import compression from "compression";
import cors from "cors";
import useragent from "express-useragent";
import axios from "axios";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import logReqMiddleware from "./middleware/logReq.mjs";
import { router as systemRouter } from "./router/system.mjs";
import { router as authRouter } from "./router/auth.mjs";

import socketServer from "./socketApp.mjs";
import {
  redisClient,
  redisEmitterClient,
  pubClient,
  subClient,
} from "./redisClient.mjs";
import { initializeDB } from "./db.mjs";
//import { checkDeployCommit } from "./utils/deploy.mjs";
// import { pushChatMessage } from "./utils/chat.mjs";
import pjson from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const devEnv = app.get("env") === "development";
const testEnv = app.get("env") === "test";

if (devEnv) {
  log.demo();
}

if (!devEnv && !testEnv) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: pjson.version,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 0.1,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.json({ limit: "100mb" }));
app.use(compression());
app.use(useragent.express());
app.use(logReqMiddleware({ logger: log }));
app.use(
  cors((req, callback) => {
    if (devEnv || !req.headers.origin) {
      callback(null, { origin: true });
      return;
    }
    const ip = req.headers["x-forwarded-for"];
    if (appConfig.corsFreeIp.includes(ip)) {
      callback(null, { origin: true });
      return;
    }
    const passCors = appConfig.origin.includes(req.headers.origin);
    if (passCors) {
      callback(null, { origin: true });
      return;
    }
    callback(null, { origin: false });
    log.error({
      passCors,
      ip,
      "ip-header": req.headers["x-forwarded-for"],
      origin: req.headers.origin,
    });
  }),
);

app.use("/api/system", systemRouter);
app.use("/api/auth", authRouter);

let server = http.createServer(app);

if (appConfig.useSSL) {
  const privateKeyPath = path.join(
    __dirname,
    "../../devScripts/ssl/certs/nginx.key",
  );
  const certificatePath = path.join(
    __dirname,
    "../../devScripts/ssl/certs/ailab.crt",
  );

  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  server = https.createServer(credentials, app);
}

if (!devEnv && !testEnv) {
  app.use(Sentry.Handlers.errorHandler());
}

if (!testEnv) {
  log.info("Start connect redis clients!");
  Promise.all([
    initializeDB(),
    redisClient.connect(),
    redisEmitterClient.connect(),
    pubClient.connect(),
    subClient.connect(),
  ]).then(() => {
    log.info("Redis clients connected!");
    setTimeout(
      () => {
        server.listen(appConfig.port, appConfig.address, async () => {
          const url = [
            appConfig.useSSL ? "https://" : "http://",
            `${appConfig.address}:${appConfig.port}`,
          ].join("");

          log.info(`@ailab-api server running at ${url}`);

          /*
          if (!devEnv && !testEnv) {
            await pushChatMessage("msg-to-debug-chat", "🚀 Launched!");
          }
          */

          log.tmp({ healthcheckUrl: appConfig.healthcheckUrl });

          await axios.get(appConfig.healthcheckUrl);

          //await checkDeployCommit();
        });

        if (devEnv) {
          socketServer({
            server,
            devEnv,
          });
        }
        try {
          process.send("ready");
        } catch (err) {
          log.info("no process.send access");
        }
      },
      (devEnv || testEnv) ? 0 : 5000,
    );
  });
}

function terminateNode(signal) {
  server.close(async () => {
    log.info("HTTPS server closed");

    /*
    if (!devEnv) {
      await pushChatMessage(
        "msg-to-ci-cd-chat",
        `💥 Catch Terminate signal ${signal}!`,
      );
    }
    */

    redisClient.disconnect();
    redisEmitterClient.disconnect();
    pubClient.disconnect();
    subClient.disconnect();

    process.exit();
  });
  if (httpDevServer) {
    httpDevServer.close(() => {
      log.info("HTTP server closed");
    });
  }

  setTimeout(
    () => {
      log.info("Server did not closed!");
      redisClient.disconnect();
      redisEmitterClient.disconnect();
      pubClient.disconnect();
      subClient.disconnect();

      process.exit();
    },
    devEnv ? 1000 : 10 * 1000,
  );
}

if (!testEnv) {
  process.on("SIGINT", () => {
    log.info("SIGINT signal received: closing API server");
    terminateNode("SIGINT");
  });

  process.on("SIGTERM", () => {
    log.info("SIGTERM signal received: closing API server");
    terminateNode("SIGTERM");
  });

  process.on("SIGHUP", () => {
    log.info("SIGHUP signal received: closing API server");
    terminateNode("SIGHUP");
  });
}

export default app;
