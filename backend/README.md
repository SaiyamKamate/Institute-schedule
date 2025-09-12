# Python virtual environment and FastAPI backend setup for Supabase integration

# 1. Create and activate a virtual environment
python -m venv venv

# 2. Activate the venv (Windows)
venv\Scripts\activate

# 3. Install required packages
pip install fastapi uvicorn supabase

# 4. Example FastAPI app (main.py)

from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
import os

SUPABASE_URL = os.environ.get("SUPABASE_URL", "<your-supabase-url>")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "<your-supabase-service-role-key>")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.get("/user/{user_id}")
def get_user(user_id: str):
    response = supabase.table("users").select("*").eq("id", user_id).single().execute()
    if response.error:
        raise HTTPException(status_code=404, detail="User not found")
    return response.data

# 5. To run the server:
# uvicorn main:app --reload

# 6. Add SUPABASE_URL and SUPABASE_KEY to a .env file for security
