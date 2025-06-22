# app/auth/password_reset_models.py
import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean # type: ignore

from ..core.database import Base


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String, unique=True, index=True, nullable=False)
    expiration_time = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)
