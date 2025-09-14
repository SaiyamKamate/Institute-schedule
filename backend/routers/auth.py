
from fastapi import APIRouter, HTTPException
from supabase import create_client
from schemas import LoginRequest
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
SERVICE_ROLE_KEY = os.environ.get("SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
service_supabase = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest):
    response = supabase.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })
    if response is None or response.user is None or response.session is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_id = response.user.id

    # Fetch all relevant fields from users table
    user_row_result = service_supabase.table("users").select("id, email, role, name, department").eq("id", user_id).execute()
    if not user_row_result.data or len(user_row_result.data) == 0:
        raise HTTPException(status_code=404, detail="User not found in users table")
    user_row = user_row_result.data[0]

    # Build a clean user dict for the frontend
    user_dict = {
        "id": user_row.get("id"),
        "email": user_row.get("email"),
        "role": user_row.get("role"),
        "name": user_row.get("name"),
        "department": user_row.get("department"),
    }

    return {
        "user": user_dict,
        "access_token": response.session.access_token
    }

