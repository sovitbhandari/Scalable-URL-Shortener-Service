const config = {
    development: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
      dynamodb: {
        region: process.env.AWS_REGION || 'us-east-1',
        endpoint: process.env.DYNAMODB_ENDPOINT, // Optional for local development
      },
      urlLength: 8,
      cacheTTL: 3600, // 1 hour in seconds
    },
    production: {
      baseUrl: process.env.BASE_URL,
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD,
      },
      dynamodb: {
        region: process.env.AWS_REGION,
      },
      urlLength: 8,
      cacheTTL: 86400, // 24 hours in seconds
    },
    test: {
      baseUrl: 'http://test.com',
      redis: {
        host: 'localhost',
        port: 6379,
      },
      dynamodb: {
        region: 'us-east-1',
        endpoint: 'http://localhost:8000',
      },
      urlLength: 8,
      cacheTTL: 60,
    },
  };
  
  const env = process.env.NODE_ENV || 'development';
  module.exports = config[env];