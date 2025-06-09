# app/auth/models.py

from sqlalchemy import Boolean, Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from ..core.database import Base
from ..enums import UserRole

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.USER)

    # Relationships
    orders = relationship("app.orders.models.Order", back_populates="owner")
    cart_items = relationship("CartItem", back_populates="owner", cascade="all, delete-orphan")
    # No relationship to password reset tokens is needed here.