const Redis = require('ioredis');
const CacheService = require('../../src/services/cacheService');

// Mock Redis
jest.mock('ioredis');

describe('CacheService', () => {
  let cacheService;

  beforeEach(() => {
    Redis.mockClear();
    Redis.prototype.get = jest.fn();
    Redis.prototype.set = jest.fn();
    Redis.prototype.del = jest.fn();
    
    cacheService = new CacheService();
  });

  describe('get', () => {
    it('should return cached value if exists', async () => {
      const key = 'testKey';
      const value = 'testValue';
      Redis.prototype.get.mockResolvedValue(value);

      const result = await cacheService.get(key);

      expect(result).toBe(value);
      expect(Redis.prototype.get).toHaveBeenCalledWith(key);
    });

    it('should handle Redis errors gracefully', async () => {
      const key = 'testKey';
      Redis.prototype.get.mockRejectedValue(new Error('Redis error'));

      const result = await cacheService.get(key);

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set cache value with TTL', async () => {
      const key = 'testKey';
      const value = 'testValue';
      const ttl = 3600;
      Redis.prototype.set.mockResolvedValue('OK');

      await cacheService.set(key, value, ttl);

      expect(Redis.prototype.set).toHaveBeenCalledWith(key, value, 'EX', ttl);
    });

    it('should handle Redis errors gracefully', async () => {
      const key = 'testKey';
      const value = 'testValue';
      Redis.prototype.set.mockRejectedValue(new Error('Redis error'));

      await expect(cacheService.set(key, value)).resolves.not.toThrow();
    });
  });
});