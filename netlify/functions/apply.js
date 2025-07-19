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

  // Replace with your Google Apps Script URL for submitting applications
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyIYTWjg74MAR099N3-GU8GXfeuParlQYJ1O5vvVdEBkZa-WXr4_-Z2ndr5gpvnzZex/exec';

  try {
    const formData = JSON.parse(event.body);

    // Basic validation (add more as needed)
    if (!formData.email || !formData.name || !formData.position) {
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
        message: 'Application submitted successfully',
        data: response.data,
      }),
    };
  } catch (error) {
    console.error('Job application error:', error);
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to submit application',
        details: error.response?.data || null,
      }),
    };
  }
};