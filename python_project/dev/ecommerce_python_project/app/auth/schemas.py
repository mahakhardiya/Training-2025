# app/auth/schemas.py

from pydantic import BaseModel, EmailStr, ConfigDict
from ..enums import UserRole # <-- IMPORT ENUM

# Schema for receiving user creation data from a request
# NOTE: The endpoint name is changing from /register to /signup
class UserCreate(BaseModel):
    name: str # <-- ADD NAME
    email: EmailStr
    password: str
    role: UserRole = UserRole.USER # <-- ADD ROLE, with a default

# Schema for returning user information in a response
class User(BaseModel):
    id: int
    name: str # <-- ADD NAME
    email: EmailStr
    is_active: bool
    role: UserRole # <-- ADD ROLE

    model_config = ConfigDict(from_attributes=True)

# Token schemas remain the same
class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str 

class TokenData(BaseModel):
    email: str | None = None
    
class ForgotPasswordSchema(BaseModel):
    email: EmailStr

class ResetPasswordSchema(BaseModel):
    token: str
    new_password: str