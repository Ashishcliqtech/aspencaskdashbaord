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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Replace with your Google Apps Script URL for fetching job positions
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbx_1xTEUMaHqOXNAVPM3WjyTKG32F1MOw4hJUNM5BCnTdUjupoRk1BExvFWI65vYT-V/exec';

  try {
    const response = await axios.get(googleScriptUrl);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: response.data,
        message: 'Jobs fetched successfully',
      }),
    };
  } catch (error) {
    console.error('Failed to fetch job positions:', error);
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to fetch job positions',
        details: error.response?.data || null,
      }),
    };
  }
};