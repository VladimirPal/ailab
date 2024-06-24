import log from 'loglevel';

export const applyLogPrefix = (prefix) => {
  const originalFactory = log.methodFactory;
  log.methodFactory = originalFactory;

  log.methodFactory = function (methodName) {
    const method = console[methodName];
    return method.bind(console, prefix);
  };
  log.setLevel(log.getLevel());
};
// log.setLevel(config.logLevel);
// applyLogPrefix('⏱️[ch]');

log.tmp = console.log.bind(console, '%c 🔦', 'font-size: 20px');
log.tmpTrace = console.trace.bind(console, '%c 🧰', 'font-size: 20px');

export default log;

/*
💣,💡,🔦,🕯️,🔍
📺,💾,💽,🖲️,⌨️,
🔌,🖨️,,📠,📟,🔋,
📻,🎛️,🎚️,🕹️,🪀
🎉,🎈,🧨,⏰🚰,📌
🔒,🔑,🪛,🧲,🧬,💊
🩸,🪣,🧯,⛺
*/
