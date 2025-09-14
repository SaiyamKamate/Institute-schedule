# Institute Scheduler

A full-stack application for managing institute schedules, built with React (Vite) frontend and FastAPI backend, using Supabase for authentication and data storage.

### Project Structure
```markdown
frontend/
  ├── src/
  ├── public/
  ├── ...
backend/
  ├── main.py
  ├── routers/
  ├── schemas.py
  ├── ...
```

## Features

- User authentication (admin/teacher) via Supabase
- Role-based dashboards
- Faculty and subject management
- Timetable management
- Personal information editing

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/institute-scheduler.git
cd institute-scheduler
```

### 2. Set up the backend
- Go to the `backend/` directory:
```bash
cd backend
```
- Install dependencies:
```bash
pip install -r requirements.txt
```
- Create a `.env` file in the `backend/` directory with the following content:
```python3
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SERVICE_ROLE_KEY=your_supabase_service_role_key
```
- Start the backend server:
```bash
uvicorn main:app --reload
```

### 3. Set up the frontend
- Go to the frontend directory (if not already there):
```bash
cd ../
```
- Install dependencies:
```bash
npm install
```
-Start the frontend:
```bash
npm run dev
```
### 4. Access the app
Frontend: http://localhost:5173
Backend: http://localhost:8000(blank)

### Environment Variables
- SUPABASE_URL: Your Supabase project URL
- SUPABASE_KEY: Your Supabase anon/public key
- SERVICE_ROLE_KEY: Your Supabase service role key (keep this secret!)
> **Note:** Never commit your `.env` file or keys to GitHub.  
> The `SERVICE_ROLE_KEY` is sensitive—share it only with trusted collaborators.
