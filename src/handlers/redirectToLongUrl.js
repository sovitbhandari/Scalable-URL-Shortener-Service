const urlService = require('../services/urlService');

exports.handler = async (event) => {
  try {
    const { shortId } = event.pathParameters;

    const longUrl = await urlService.getLongUrl(shortId);
    
    if (!longUrl) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'URL not found' })
      };
    }

    // Update stats asynchronously
    urlService.incrementVisitCount(shortId).catch(console.error);

    return {
      statusCode: 301,
      headers: {
        Location: longUrl
      }
    };
  } catch (error) {
    console.error('Error redirecting to long URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};