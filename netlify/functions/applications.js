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

  // Handle GET requests for fetching applications
  if (event.httpMethod === 'GET') {
    try {
      // Mock data for now - replace with your Google Apps Script URL
      const mockApplications = [
        {
          id: '1',
          jobId: 'job-1',
          jobTitle: 'Senior Frontend Developer',
          applicantName: 'John Doe',
          applicantEmail: 'john@example.com',
          phone: '+1234567890',
          status: 'pending',
          submittedAt: new Date().toISOString(),
        },
        {
          id: '2',
          jobId: 'job-2',
          jobTitle: 'UX Designer',
          applicantName: 'Jane Smith',
          applicantEmail: 'jane@example.com',
          status: 'reviewing',
          submittedAt: new Date().toISOString(),
        },
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: mockApplications,
          message: 'Applications fetched successfully',
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to fetch applications',
          details: error.message,
        }),
      };
    }
  }

  // Handle PATCH requests for updating application status
  if (event.httpMethod === 'PATCH') {
    try {
      const { status } = JSON.parse(event.body);
      const applicationId = event.path.split('/').pop();

      // Here you would update the application in your Google Sheets
      // For now, return a mock response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: { id: applicationId, status },
          message: 'Application status updated successfully',
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to update application status',
          details: error.message,
        }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};