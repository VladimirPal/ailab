import { createClient } from "redis";
import { Emitter } from "@socket.io/redis-emitter";
import * as Sentry from "@sentry/node";

export const redisClient = createClient({
  url: `redis://${appConfig.redis.host}:${appConfig.redis.port}`,
});
redisClient.on("error", (err) => {
  log.error(err);
  Sentry.captureException(err);
});

const redisSocketClient = createClient({
  socket: {
    host: appConfig.redis.host,
  },
});
redisSocketClient.on("error", (err) => {
  log.error(err);
  Sentry.captureException(err);
});

export const pubClient = redisSocketClient.duplicate();
export const subClient = redisSocketClient.duplicate();
export const redisEmitterClient = redisSocketClient.duplicate();
export const redisEmitter = new Emitter(redisEmitterClient);
