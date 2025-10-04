const API_BASE = process.env.REACT_APP_API_BASE_URL;

export async function getQuestions({ difficulty, limit }) {
  const params = new URLSearchParams();
  if (difficulty) params.set("difficulty", difficulty.toLowerCase()); // map if needed
  if (limit) params.set("limit", String(limit));

  // Try difficulty route if provided; else all
  const url = difficulty
    ? `${API_BASE}/api/questions/difficulty/${encodeURIComponent(difficulty.toLowerCase())}${limit ? `?${params}` : ""}`
    : `${API_BASE}/api/questions${limit ? `?${params}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // normalize field names to your UI shape
  return data.map(r => ({
    id: r.id,
    difficulty: r.difficulty,
    prompt: r.question,
    answerText: r.answer
  }));
}
