from fastapi import APIRouter, HTTPException
from supabase import create_client
from schemas import UpdateUserRequest
from fastapi import Depends
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SERVICE_ROLE_KEY = os.environ.get("SERVICE_ROLE_KEY")
service_supabase = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

router = APIRouter()

@router.put("/update_user")
def update_user(data: UpdateUserRequest):
    update_data = {k: v for k, v in data.model_dump().items() if k != "id" and v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update fields provided")
    result = service_supabase.table("users").update(update_data).eq("id", data.id).execute()
    if result.data is None:
        raise HTTPException(status_code=404, detail="User not found or update failed")
    return {"user": result.data[0]}
