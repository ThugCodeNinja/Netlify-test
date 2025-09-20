// Shared in-memory store (for demo; use a real DB for production)
let scores = [];

exports.handler = async function(event) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(scores)
    };
  }
  if (event.httpMethod === 'POST') {
    const { score } = JSON.parse(event.body);
    if (typeof score === 'number') {
      scores.push(score);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid score' })
    };
  }
  if (event.httpMethod === 'DELETE') {
    scores = [];
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};
