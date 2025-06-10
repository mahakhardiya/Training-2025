# app/core/schemas.py

from pydantic import BaseModel

class ErrorResponse(BaseModel):
    error: bool = True
    message: str
    code: int