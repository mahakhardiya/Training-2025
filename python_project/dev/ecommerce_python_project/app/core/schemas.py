# app/core/schemas.py

from pydantic import BaseModel # type: ignore

class ErrorResponse(BaseModel):
    error: bool = True
    message: str
    code: int