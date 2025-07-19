const axios = require('axios');

exports.handler = async function (event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Google Script URL for newsletter subscriptions
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxa2j35jWTU5yhtJrrNi0ce83AqMT5fMPgzxoSToKg5dfkwF2WTQDanSQGhGQURlnUJ/exec';

  try {
    const formData = JSON.parse(event.body);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    const response = await axios.post(googleScriptUrl, {
      email: formData.email,
      timestamp: new Date().toISOString(),
      source: 'admin_dashboard'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Successfully subscribed to newsletter',
        data: response.data
      }),
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Failed to subscribe to newsletter',
        details: error.response?.data || null
      }),
    };
  }
};
</biltAction>