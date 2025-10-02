const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:5072";

export async function getQuestions({ difficulty, limit } = {}) {
  const params = new URLSearchParams();
  if (limit) params.set("limit", String(limit));

  const url = difficulty
    ? `${API_BASE}/api/questions/difficulty/${encodeURIComponent(
        difficulty.toLowerCase()
      )}${params.toString() ? `?${params}` : ""}`
    : `${API_BASE}/api/questions${params.toString() ? `?${params}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // Keep names your UI uses
  return data.map(r => ({
    id: r.id,
    question: r.question,
    answer: r.answer,
    difficulty: r.difficulty
  }));
}