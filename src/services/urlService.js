const AWS = require('aws-sdk');
const { generateId } = require('../utils/idGenerator');
const cacheService = require('./cacheService');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

class UrlService {
  async createShortUrl(longUrl) {
    const shortId = await generateId();
    
    const item = {
      shortId,
      longUrl,
      createdAt: new Date().toISOString(),
      visits: 0
    };

    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: item
    }).promise();

    // Cache the mapping
    await cacheService.set(shortId, longUrl);

    return {
      shortId,
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      longUrl
    };
  }

  async getLongUrl(shortId) {
    // Try cache first
    const cachedUrl = await cacheService.get(shortId);
    if (cachedUrl) return cachedUrl;

    // If not in cache, query DynamoDB
    const result = await dynamoDB.get({
      TableName: TABLE_NAME,
      Key: { shortId }
    }).promise();

    if (!result.Item) return null;

    // Update cache
    await cacheService.set(shortId, result.Item.longUrl);
    
    return result.Item.longUrl;
  }

  async incrementVisitCount(shortId) {
    await dynamoDB.update({
      TableName: TABLE_NAME,
      Key: { shortId },
      UpdateExpression: 'SET visits = visits + :inc',
      ExpressionAttributeValues: {
        ':inc': 1
      }
    }).promise();
  }

  async getUrlStats(shortId) {
    const result = await dynamoDB.get({
      TableName: TABLE_NAME,
      Key: { shortId }
    }).promise();

    if (!result.Item) return null;

    return {
      shortId,
      longUrl: result.Item.longUrl,
      visits: result.Item.visits,
      createdAt: result.Item.createdAt
    };
  }
}

module.exports = new UrlService();