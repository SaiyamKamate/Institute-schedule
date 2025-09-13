from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class UpdateUserRequest(BaseModel):
    id: str  # Supabase UID
    name: Optional[str] = None
    department: Optional[str] = None
    subjects: Optional[str] = None  # Comma-separated or list, depending on your schema
