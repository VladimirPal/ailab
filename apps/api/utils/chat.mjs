import { redisClient } from '../redisClient.mjs';
import { DEV_CHAT_QUEUE_KEY } from '../constants.mjs';

export async function pushChatMessage(roomName, message) {
  log.info(message);
  const nowTimestamp = +new Date();
  await redisClient.hSet(
    DEV_CHAT_QUEUE_KEY,
    `${roomName}_${nowTimestamp}`,
    JSON.stringify(
      {
        msgtype: 'm.text',
        format: 'org.matrix.custom.html',
        formatted_body: [
          '<p>',
          '<strong>Server: ',
          appConfig.hostname,
          '</strong><br>',
          message,
          '</p>\n',
        ].join(''),
        body: message,
      },
      null,
      2
    )
  );
}
