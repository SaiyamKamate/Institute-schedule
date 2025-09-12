from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
def login(data: LoginRequest):
    response = supabase.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })
    if response.get("error"):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return response