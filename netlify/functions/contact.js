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

  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycby9lYNV_DzhygtEMS9zxY1ziCSPQmSbZs5Dt47B8i-R--ju10XdGwPm79vs8-gnqLnj/exec';

  try {
    const formData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.email || !formData.name || !formData.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const response = await axios.post(googleScriptUrl, formData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Contact message sent successfully',
        data: response.data,
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to send contact message',
        details: error.response?.data || null,
      }),
    };
  }
};