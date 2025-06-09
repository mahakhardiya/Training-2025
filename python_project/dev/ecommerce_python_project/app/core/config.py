# app/core/config.py

from pydantic_settings import BaseSettings  # ✅ new

class Settings(BaseSettings): # type: ignore
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"

settings = Settings() # type: ignore