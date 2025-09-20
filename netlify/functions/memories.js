// Shared in-memory store (for demo; use a real DB for production)
let memories = [];

exports.handler = async function(event) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(memories)
    };
  }
  if (event.httpMethod === 'POST') {
    const { memory } = JSON.parse(event.body);
    if (memory && typeof memory === 'string') {
      memories.push(memory);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid memory' })
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};
