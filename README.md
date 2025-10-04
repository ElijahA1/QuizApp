📘 QuizApp

A web application for practicing C# software engineering interview questions.
Built with a React frontend and an ASP.NET Core (C#) Web API backend with PostgreSQL. Users can study by difficulty and choose how many questions to fetch.

⸻

🚀 Tech Stack
	•	Frontend: React (JavaScript, Create React App)
	•	Backend: ASP.NET Core (C#) Web API
	•	Database: PostgreSQL
	•	Version Control: Git + GitHub

⸻

✨ Features
	•	Choose number of questions (1–20)
	•	Select difficulty: Basic, Intermediate, or Advanced
	•	Live API integration: frontend fetches questions from ASP.NET Core Web API
	•	Swagger/OpenAPI docs for easy endpoint testing
	•	Health check endpoint to verify backend status

🔌 API Quick Reference
	•	GET /api/questions?difficulty=Basic&limit=10 — fetch questions by difficulty & count
	•	GET /health — liveness check (returns 200 OK)
	•	UI Docs: /swagger — interactive API docs

Your exact URLs/ports depend on launchSettings.json. Common dev defaults:
http://localhost:5072 (HTTP), https://localhost:7266 (HTTPS).

🛠 Setup (Frontend)
	1.	Clone the repository:
  git clone https://github.com/<your-org-or-user>/QuizApp.git
  cd QuizApp/quizit

  2. Install dependencies:
  <pre>
# clone the repo
git clone https://github.com/YourOrg/QuizApp.git
cd QuizApp/quizit

# install dependencies
npm install

# run the frontend
npm start
</pre>

  
     
🛠 Setup (Backend)
📂 Project Structure
<pre>
quizit/
├── public/                  # Static assets
│   └── mock/questions.json  # Temporary dummy data
├── src/
│   ├── api/                 # API helpers (fetch questions)
│   ├── Components/          # React components
│   │   └── QuizForm/        # Form for number + difficulty
│   ├── App.js               # Root component
│   └── index.js             # Entry point
└── package.json
</pre>

🔎 Handshake Verification
	•	Run the backend → confirm GET /health returns 200 OK (Kestrel).
	•	Run the frontend → set REACT_APP_API_BASE_URL to your backend URL.
	•	In the browser Network tab, verify GET /api/questions?... returns 200 with JSON.

👥 Team Workflow
	•	Development occurs on feature branches (e.g., feature/dummyData).
	•	Submit pull requests into main for review by teammates.
	•	Code review ensures frontend/backend integration is smooth.

⸻

🔮 Future Enhancements
	•	User authentication & profiles
	•	Scoring system + progress tracking
	•	Deployment to cloud hosting

## Environment Variables

Copy `.env.example` to `.env` and adjust values as needed:

cp .env.example .env

By default, the backend runs on https://localhost:7138. 
Change REACT_APP_API_BASE_URL if your backend uses a different port.

