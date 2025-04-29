const { Queue } = require("bullmq");

const QueueConfig = {
  connection: {
    host: "localhost",
    port: 6379,
  },
  defaultJobOptions: {
    removeOnComplete: 5000,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
};

const sendOTPQueue = new Queue("send-otp", QueueConfig);

module.exports = { sendOTPQueue };
