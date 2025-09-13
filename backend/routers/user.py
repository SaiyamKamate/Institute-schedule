from fastapi import APIRouter, HTTPException
from supabase import create_client
from schemas import UpdateUserRequest
from fastapi import Depends
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SERVICE_ROLE_KEY = os.environ.get("SERVICE_ROLE_KEY")
service_supabase = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)



router = APIRouter()
class AssignSubjectRequest(BaseModel):
    teacher_id: str
    subject_id: str

@router.post("/assign_subject")
def assign_subject(data: AssignSubjectRequest):
    # Insert a new assignment row
    result = service_supabase.table("teacher_subject_assignment").insert({
        "teacher_id": data.teacher_id,
        "subject_id": data.subject_id
    }).execute()
    if not result.data:
        raise HTTPException(status_code=400, detail="Assignment failed")
    return {"assignment": result.data[0]}

# Get all subject assignments for a teacher
@router.get("/teacher_subjects/{teacher_id}")
def get_teacher_subjects(teacher_id: str):
    # Join with subjects table to get subject names
    result = service_supabase.rpc(
        "get_teacher_subjects_with_names",
        {"teacher_id_param": teacher_id}
    ).execute()
    if not result.data:
        return {"subjects": []}
    return {"subjects": result.data}
@router.get("/faculty_list")
def get_faculty_list():
    result = service_supabase.table("users").select("id, name, email").execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="No users found")
    return {"faculty": result.data}

@router.get("/subject_names")
def get_subject_names():
    result = service_supabase.table("subjects").select("name").execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="No subjects found")
    # Return as a flat list
    names = [row["name"] for row in result.data]
    return {"subjects": names}

@router.put("/update_user")
def update_user(data: UpdateUserRequest):
    update_data = {k: v for k, v in data.model_dump().items() if k != "id" and v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update fields provided")
    result = service_supabase.table("users").update(update_data).eq("id", data.id).execute()
    if result.data is None:
        raise HTTPException(status_code=404, detail="User not found or update failed")
    return {"user": result.data[0]}
