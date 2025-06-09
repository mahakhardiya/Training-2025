# app/cart/models.py

from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from ..core.database import Base

class CartItem(Base):
    __tablename__ = "cart" # Renaming the table to 'cart' as per requirements

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)

    # Relationship back to the user
    owner = relationship("User", back_populates="cart_items")
    # Relationship to the product
    product = relationship("Product")