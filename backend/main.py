from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
SERVICE_ROLE_KEY = os.environ.get("SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
service_supabase: Client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
def login(data: LoginRequest):
    response = supabase.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })
    # Check for failed login by inspecting user/session
    if response is None or response.user is None or response.session is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Fetch user details from users table using id (with service role key to bypass RLS)
    user_query = service_supabase.table("users").select("*").eq("id", response.user.id).single().execute()
    if user_query.data is None:
        raise HTTPException(status_code=404, detail="User details not found in users table")

    return {
        "user": user_query.data,  # user details from users table
        "session": response.session
    }