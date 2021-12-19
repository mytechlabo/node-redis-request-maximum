const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.connect();
client.on("connect", () => {
  console.log("Redis connected!");
});

module.exports = client;
