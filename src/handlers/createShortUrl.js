const urlService = require('../services/urlService');
const validator = require('../utils/validator');

exports.handler = async (event) => {
  try {
    const { longUrl } = JSON.parse(event.body);

    // Validate URL
    if (!validator.isValidUrl(longUrl)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid URL provided' })
      };
    }

    // Create short URL
    const result = await urlService.createShortUrl(longUrl);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error creating short URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};