# app/orders/models.py

import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Float, Enum
from sqlalchemy.orm import relationship

from ..core.database import Base
from ..enums import OrderStatus

class Order(Base):  # <-- Must be 'Order' (Capital O)
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # --- MODIFIED/NEW COLUMNS ---
    # The 'order_date' is now 'created_at'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
    # --------------------------
    
    owner = relationship("app.auth.models.User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base): # <-- Must be 'OrderItem' (Capital O and I)
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)

    # --- NEW COLUMN ---
    price_at_purchase = Column(Float, nullable=False)
    # ------------------
    
    order = relationship("Order", back_populates="items")
    product = relationship("Product")