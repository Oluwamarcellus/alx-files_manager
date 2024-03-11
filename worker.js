const { Queue } = require('bull');


const testQueue = new Queue("testQueue", {
    redis: {
        host: 'localhost', // Redis server host
        port: 6379,         // Redis server port
      },
})

testQueue.process(async (data) => {
  return { "processed": data };
});

testQueue.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

module.exports = { testQueue };