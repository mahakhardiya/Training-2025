# app/auth/schemas.py

from pydantic import BaseModel, EmailStr, ConfigDict

# Schema for receiving user creation data from a request
class UserCreate(BaseModel):
    email: EmailStr  # Pydantic validates this is a valid email format
    password: str

# Schema for returning user information in a response
class User(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    # Pydantic V2 config to allow creating the schema from an ORM model
    model_config = ConfigDict(from_attributes=True)

# app/auth/schemas.py
# ... (keep existing User and UserCreate schemas)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None