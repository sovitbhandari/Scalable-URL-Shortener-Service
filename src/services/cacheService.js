const Redis = require('ioredis');

class CacheService {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 3600) {
    try {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } catch (error) {
      console.error('Redis set error:', error);
    }
  }

  async delete(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Redis delete error:', error);
    }
  }
}

module.exports = new CacheService();