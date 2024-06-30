import { Manager } from 'socket.io-client';
import eventEmitter from '@ailab/utils/eventEmitter';

function socketHelper() {
  let socket = null;

  return {
    getSocket: () => {
      return socket;
    },
    on: (name, callback) => {
      socket.on(name, callback);
    },
    off: (name, callback) => {
      socket.off(name, callback);
    },
    close: () => {
      socket.close();
    },
    connect: ({ JWT, socketUrl }) => {
      const manager = new Manager(socketUrl, {
        extraHeaders: {
          authorization: JWT,
        },
      });
      socket = manager.socket('/');

      socket.on('connect', () => {
        log.info('[socket]:', '🫀', 'connect!');
      });

      socket.on('disconnect', (reason) => {
        log.debug('[socket]:', '🚨', `disconnect! - ${reason}`);
        // Auto reconnect will not be fired
        if (reason === 'io server disconnect') {
          setTimeout(() => {
            if (socket && socket.disconnected) {
              socket.connect();
            }
          }, 5000);
        }
      });

      socket.on('cmdMessage', (chatMessage) => {
        log.info('[socket]:', { chatMessage });
        eventEmitter.emit('cmdMessage', chatMessage);
      });

      socket.on('chatMessage', (chatMessage) => {
        log.info('[socket]:', { chatMessage });
        eventEmitter.emit('chatMessage', chatMessage);
      });

      socket.on('setChatItem', (chatItem) => {
        log.info('[socket]:', { chatItem });
        eventEmitter.emit('setChatItem', chatItem);
      });

      socket.connect();
    },

    emit: (eventName, ...args) => {
      eventEmitter.emit(eventName, ...args);
    },

    disconnect: () => {
      if (socket) {
        log.debug('[socket]:', '🚨', 'client side disconnect!');
        socket.disconnect();
      }
    },
  };
}

export default socketHelper();
