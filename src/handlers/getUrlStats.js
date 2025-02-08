const urlService = require('../services/urlService');

exports.handler = async (event) => {
  try {
    const { shortId } = event.pathParameters;

    const stats = await urlService.getUrlStats(shortId);
    
    if (!stats) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'URL not found' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(stats)
    };
  } catch (error) {
    console.error('Error getting URL stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};