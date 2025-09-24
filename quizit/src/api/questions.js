// src/api/questions.js
export async function getQuestions({ difficulty, limit }) {
  const res = await fetch(`${process.env.PUBLIC_URL}/mock/questions.json`);
  if (!res.ok) throw new Error(`Failed to load questions: ${res.status}`);
  let data = await res.json();

  // Filter by difficulty ("Basic", "Intermediate", "Advanced")
  if (difficulty) {
    data = data.filter(q => q.difficulty === difficulty);
  }

  // Trim to requested number
  if (limit) {
    data = data.slice(0, Number(limit));
  }

  return data;
}