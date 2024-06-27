class EventEmitter {
  events = {};

  on(eventName, callback) {
    // log.debug('EventEmitter, on', { eventName, callback });
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    // log.debug('EventEmitter, on, events\n', JSON.stringify(this.events));
  }

  off(eventName, callback) {
    // log.debug('EventEmitter, off', { eventName, callback });
    if (!this.events[eventName]) {
      throw new Error(`EventEmitter.off, event "${eventName}" not found`);
    }
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback
    );
    // log.debug('EventEmitter, off, events\n', JSON.stringify(this.events));
  }

  emit(eventName, args) {
    const event = this.events[eventName];
    // log.debug('EventEmitter, emit', { eventName, args });
    if (event) {
      event.forEach((callback) => callback.call(null, args));
    }
  }
}

export default new EventEmitter();
