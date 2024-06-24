const { inspect } = require("util");
const winston = require("winston");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  tmp: 4,
  debug: 5,
  colors: {
    tmp: "green",
  },
};

const emoji = {
  error: "❌",
  warn: "⚠️",
  info: "🔖",
  http: "🌐",
  tmp: "🔦",
  debug: "🔍",
};
const basePadding = "";
const paddings = {
  error: `${basePadding}  `,
  warn: `${basePadding}  `,
  info: `${basePadding}  `,
  tmp: `${basePadding}   `,
  debug: `${basePadding} `,
  http: `${basePadding}  `,
};

const baseColors = {
  CALM: "white blackBG",
  ALERT: "bold white bgRed",
  LABEL: "black bgCyan",
  BASE_INFO: "bold brightGreen",
  NOTIFY: "italic brightGreen",
  MAIN: "black bgCyan",
};

const bannerColors = {
  error: "italic red cyanBG",
  warn: "yellow",
  info: "bold brightGreen",
  http: baseColors.CALM,
  debug: "bold white blackBG",
  tmp: baseColors.NOTIFY,
};

const messageColors = {
  error: "italic red cyanBG",
  warn: "yellow",
  info: "bold brightCyan",
  http: "magenta",
  debug: baseColors.CALM,
  tmp: baseColors.NOTIFY,
};

const httpStatusColors = {
  200: "green blackBG",
  201: "italic magenta",
  204: "gray",
  404: "black bgYellow",
  401: "bold red blackBG",
  500: "bold red whiteBG",
};

const httpMethodColors = {
  GET: "brightMagenta",
  OPTIONS: "gray",
  POST: "bold white bgBlue",
  PUT: "bold white bgBlue",
  DELETE: "bold yellow",
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "http";
};

const prettyJson = (data) => inspect(data, false, 3, true);
const getBanner = (info) => {
  const { [Symbol.for("level")]: levelName } = info;
  const padding = paddings[levelName];
  const colorize = winston.format.colorize({
    colors: bannerColors,
  });
  const colorizedLevel = colorize.colorize(levelName, levelName, levelName);
  return ["[ ", colorizedLevel, " ", emoji[levelName], " ]", padding].join("");
};

const prettifyHttp = (info) => {
  const { message } = info;
  const banner = getBanner(info);
  const colorize = winston.format.colorize({
    colors: {
      ...baseColors,
      ...httpStatusColors,
      ...httpMethodColors,
      base: "hidden red cyanBG",
    },
  });
  const isObject = typeof message === "object";
  const req = info.req ?? info.message.req;
  const res = info.res ?? info.message.res;
  const statusCode = colorize.colorize(
    httpStatusColors[res.statusCode] ? res.statusCode : "base",
    httpStatusColors[res.statusCode] ? res.statusCode : "base",
    `[${res.statusCode}]`,
  );
  const methodName = colorize.colorize(
    httpMethodColors[req.method] ? req.method : "base",
    httpMethodColors[req.method] ? req.method : "base",
    req.method,
  );
  const url = colorize.colorize("CALM", "CALM", req.originalUrl);
  const hostname = colorize.colorize("BASE_INFO", "BASE_INFO", req.hostname);
  const prettyMsg = [
    hostname,
    statusCode,
    methodName,
    url,
    isObject ? "" : message,
  ].join(" ");
  info[Symbol.for("message")] = [[banner, prettyMsg].join("")].join("\n");
  return info;
};

const formatOutput = winston.format((info) => {
  const {
    level: innerLevel,
    message,
    [Symbol.for("message")]: formatedMsg,
    [Symbol.for("level")]: immutableLevel,
    [Symbol.for("splat")]: splat,
    ...rest
  } = info;
  if (immutableLevel === "http") {
    return prettifyHttp(info);
  }
  const banner = getBanner(info);

  // const padding = paddings[immutableLevel];
  const isObject = typeof message === "object";
  const shouldColor = !isObject;
  const colorize = winston.format.colorize({ colors: messageColors });
  const formatMessage = shouldColor
    ? colorize.colorize(immutableLevel, immutableLevel, message)
    : message;
  const isRestEmpty = Object.keys(rest).length === 0;
  info[Symbol.for("message")] = [
    [banner, isObject ? prettyJson(message) : formatMessage].join(""),
    ...(isRestEmpty ? [] : [[prettyJson(rest)].join("")]),
  ].join("\n");
  return info;
});

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(formatOutput()),
  }),
];

const Logger = winston.createLogger({
  level: level(),
  exitOnError: false,
  levels,
  transports,
});

function demo() {
  Logger.warn("Use glogal log module, current message sent using log.warn()");
  const testObject = {
    name: "ailab",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      contact: {
        email: "johndoe@example.com",
        phone: "555-123-4567",
      },
    },
    hobbies: ["js", "jsx", "json"],
  };
  Logger.tmp(
    "Demonstration of using log.tmp() with inspect js object",
    testObject,
  );
}

Logger.demo = demo;

module.exports = Logger;

