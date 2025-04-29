const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379",
});

client
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch(console.error);

module.exports = client;
