module.exports = {
  host: process.env.AILAB_API_HOST,
  hostname: process.env.AILAB_API_HOSTNAME,
  address: process.env.AILAB_API_BIND_ADDRESS,
  port: process.env.AILAB_API_BIND_PORT,
  redis: {
    port: process.env.AILAB_REDIS_PORT,
    host: process.env.AILAB_REDIS_HOST,
    password: "",
  },
  healthcheckUrl: process.env.HEALTHCHECK_URL,
  useSSL: process.env.USE_SSL === "true",
  corsFreeIp: [],
  origin: ["https://ailab.lan"],
  deployHosts: [],
  jwtSecret: process.env.JWT_SECRET,
  dbUrl:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
}
