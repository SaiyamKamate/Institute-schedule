
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
    # Fetch role from users table using service key
    user_id = response.user.id
    role_result = service_supabase.table("users").select("role").eq("id", user_id).execute()
    role = None
    if role_result.data and len(role_result.data) > 0:
        role = role_result.data[0].get("role")
    # Add role to user dict if found
    user_dict = dict(response.user)
    if role:
        user_dict["role"] = role
    return {
        "user": user_dict,
        "session": response.session
    }

