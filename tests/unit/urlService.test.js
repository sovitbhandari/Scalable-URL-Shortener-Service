const urlService = require('../../src/services/urlService');
const cacheService = require('../../src/services/cacheService');

// Mock AWS SDK
jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      put: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      promise: jest.fn()
    }))
  }
}));

// Mock cache service
jest.mock('../../src/services/cacheService');

describe('UrlService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createShortUrl', () => {
    it('should create a short URL successfully', async () => {
      const longUrl = 'https://example.com';
      const shortId = 'abc123';
      
      // Mock generateId
      jest.spyOn(require('../../src/utils/idGenerator'), 'generateId')
        .mockResolvedValue(shortId);

      const result = await urlService.createShortUrl(longUrl);

      expect(result).toEqual({
        shortId,
        shortUrl: expect.stringContaining(shortId),
        longUrl
      });
    });
  });

  describe('getLongUrl', () => {
    it('should return URL from cache if available', async () => {
      const shortId = 'abc123';
      const longUrl = 'https://example.com';
      
      cacheService.get.mockResolvedValue(longUrl);

      const result = await urlService.getLongUrl(shortId);

      expect(result).toBe(longUrl);
      expect(cacheService.get).toHaveBeenCalledWith(shortId);
    });

    it('should fetch from DB if not in cache', async () => {
      const shortId = 'abc123';
      const longUrl = 'https://example.com';
      
      cacheService.get.mockResolvedValue(null);
      const mockDynamoResult = {
        Item: { longUrl }
      };
      
      const DocumentClient = require('aws-sdk').DynamoDB.DocumentClient;
      DocumentClient().get().promise.mockResolvedValue(mockDynamoResult);

      const result = await urlService.getLongUrl(shortId);

      expect(result).toBe(longUrl);
      expect(cacheService.set).toHaveBeenCalledWith(shortId, longUrl);
    });
  });
});