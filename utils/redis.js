import { createClient } from "redis"
import { promisify } from "util"

class RedisClient {
  constructor() {
    this.connected = true;
    this.client = createClient();
    this.client.on("error", (err) => {
      console.error("Redis client failed to connect:", err.message);
      this.connected = false;
    });
    this.client.on("connect", () => {
      this.connected = true;
    });
  }
  isAlive() {
    return this.connected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;