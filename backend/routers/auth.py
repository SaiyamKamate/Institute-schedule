from fastapi import APIRouter, HTTPException
from supabase import create_client
from schemas import LoginRequest
from fastapi import Depends
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest):
    response = supabase.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })
    if response is None or response.user is None or response.session is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "user": response.user,
        "session": response.session
    }
