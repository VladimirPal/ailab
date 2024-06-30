import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import jwt from "jsonwebtoken";

import {
  redisClient,
  redisEmitterClient,
  pubClient,
  subClient,
} from "./redisClient.mjs";

let isTerminate = false;

function terminateSocket(io) {
  isTerminate = true;
  io.close(() => {
    log.info("HTTPS server closed");

    redisClient.disconnect();
    redisEmitterClient.disconnect();
    pubClient.disconnect();
    subClient.disconnect();

    process.exit();
  });

  setTimeout(() => {
    log.info("Server did not closed!");
    redisClient.disconnect();
    redisEmitterClient.disconnect();
    pubClient.disconnect();
    subClient.disconnect();

    process.exit();
  }, 10 * 1000);
}

function socketApp({ server, devEnv }) {
  log.info(`Initialize socket devEnv:${devEnv.toString()} server!`);
  let socketCounter = 0;

  const io = new SocketServer(server, {
    serveClient: false,
    cors: {
      origin: devEnv ? "*" : appConfig.origin,
      allowedHeaders: ["authorization"],
      preflightContinue: false,
    },
  });
  io.adapter(createAdapter(pubClient, subClient));

  io.use((socket, next) => {
    if (isTerminate) {
      log.info("Terminate in process, do not let to connect.");
      return null;
    }
    if (socket.context) {
      next();
      return null;
    }
    let isAuthorized = false;
    try {
      const token = socket.handshake.headers.authorization;
      const decoded = jwt.verify(token, appConfig.jwtSecret);
      socket.context = decoded;
      isAuthorized = true;
    } catch (err) {
      isAuthorized = false;
    }
    if (isAuthorized) {
      next();
    } else {
      next(new Error("Authentication error"));
    }
    return null;
  });

  io.on("connection", async (socket) => {
    socketCounter += 1;
    log.info(`socket connection ${socketCounter}!`);
    if (isTerminate) {
      log.info("Terminate in process, do not pass connection.");
    } else {
      socket.join(socket.context.userId);

      socket.on("disconnect", async () => {
        socketCounter -= 1;
        log.info(`socket disconnect ${socketCounter}!`);
        log.debug("disconnect finish!");
      });
    }
  });

  if (!devEnv) {
    process.on("SIGINT", () => {
      log.info("SIGINT signal received: closing API server");
      terminateSocket(io);
    });

    process.on("SIGTERM", () => {
      log.info("SIGTERM signal received: closing API server");
      terminateSocket(io);
    });

    process.on("SIGHUP", () => {
      log.info("SIGHUP signal received: closing API server");
      terminateSocket(io);
    });
  }
}

export default socketApp;
