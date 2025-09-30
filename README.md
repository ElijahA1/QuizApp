📘 QuizApp

A web application for practicing C# software engineering interview questions.
Built with a React frontend and a C#/.NET backend, this app serves questions from a PostgreSQL database and allows users to study by difficulty.

⸻

🚀 Tech Stack
	•	Frontend: React (JavaScript, Create React App)
	•	Backend: C# / .NET Web API
	•	Database: PostgreSQL
	•	Version Control: Git + GitHub

⸻

✨ Features
	•	Choose number of questions (1–20)
	•	Select difficulty: Basic, Intermediate, or Advanced
	•	Fetches and displays questions dynamically
	•	Uses mock JSON data for now (until backend integration is complete)
	•	Designed for easy expansion with real backend API

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

Backend setup coming soon.
Planned stack: C#/.NET Web API with PostgreSQL integration.

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


👥 Team Workflow
	•	Development occurs on feature branches (e.g., feature/dummyData).
	•	Submit pull requests into main for review by teammates.
	•	Code review ensures frontend/backend integration is smooth.

⸻

🔮 Future Enhancements
	•	Replace mock JSON with backend API (C#/.NET + PostgreSQL)
	•	User authentication & profiles
	•	Question categories (in addition to difficulty)
	•	Scoring system + progress tracking
	•	Deployment to cloud hosting

## Environment Variables

Copy `.env.example` to `.env` and adjust values as needed:

cp .env.example .env

By default, the backend runs on https://localhost:7138. 
Change REACT_APP_API_BASE_URL if your backend uses a different port.

