// Shared in-memory store (for demo; use a real DB for production)
let memoryPuzzles = [
  { story: "Snehal wore her favorite lavender saree and cooked khichdi for everyone. Which year was this?", answer: "2022" },
  { story: "The family trip to Goa was filled with laughter and beach walks. Which event was this?", answer: "Family Vacation" },
  { story: "Snehal gave memorable advice during Diwali. What was the advice about?", answer: "Gratitude" }
];

exports.handler = async function(event) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(memoryPuzzles)
    };
  }
  if (event.httpMethod === 'POST') {
    const { story, answer } = JSON.parse(event.body);
    if (story && answer) {
      memoryPuzzles.push({ story, answer });
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid puzzle' })
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};
