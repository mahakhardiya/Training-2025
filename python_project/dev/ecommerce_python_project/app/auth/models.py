# app/auth/models.py

from sqlalchemy import Boolean, Column, Integer, String, Enum # Add Enum
from sqlalchemy.orm import relationship

from ..core.database import Base
from ..enums import UserRole # Import our new role enum

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True) # <-- ADD NAME
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.USER) # <-- ADD ROLE

    # Relationships
    orders = relationship("app.orders.models.Order", back_populates="owner")
    cart = relationship("app.cart.models.Cart", back_populates="owner", uselist=False)