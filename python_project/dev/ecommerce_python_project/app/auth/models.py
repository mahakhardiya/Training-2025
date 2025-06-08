# app/auth/models.py

from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    # Relationship to the Order model
    orders = relationship("Order", back_populates="owner")

    # app/auth/models.py -> inside User class
    cart = relationship("Cart", back_populates="owner", uselist=False)