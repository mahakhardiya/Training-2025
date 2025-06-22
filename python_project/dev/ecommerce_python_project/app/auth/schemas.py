# app/auth/schemas.py

from pydantic import BaseModel, EmailStr, ConfigDict # type: ignore
from ..enums import UserRole  


# Schema for receiving user creation data from a request
class UserCreate(BaseModel):
    name: str  
    email: EmailStr
    password: str
    role: UserRole = UserRole.USER  


# Schema for returning user information in a response
class User(BaseModel):
    id: int
    name: str 
    email: EmailStr
    is_active: bool
    role: UserRole 

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
