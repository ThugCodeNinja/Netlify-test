// Shared in-memory store (for demo; use a real DB for production)
let quizQuestions = [
  { q: "What is Snehal's favorite hobby?", a: "Reading books" },
  { q: "Which city was Snehal born in?", a: "Nagpur" },
  { q: "Snehal's favorite color?", a: "Lavender" },
  { q: "What is Snehal's go-to comfort food?", a: "Khichdi" },
  { q: "Snehal's favorite festival?", a: "All" }
];

exports.handler = async function(event) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(quizQuestions)
    };
  }
  if (event.httpMethod === 'POST') {
    const { q, a } = JSON.parse(event.body);
    if (q && a) {
      quizQuestions.push({ q, a });
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid question/answer' })
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};
