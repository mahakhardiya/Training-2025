# app/cart/models.py

from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from ..core.database import Base

class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # A user has one cart
    owner = relationship("User", back_populates="cart")
    # A cart has many items
    items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("carts.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)

    # An item belongs to one cart
    cart = relationship("Cart", back_populates="items")
    # An item refers to one product
    product = relationship("Product")