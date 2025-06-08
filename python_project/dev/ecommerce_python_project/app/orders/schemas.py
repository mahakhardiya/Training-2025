# app/orders/schemas.py

from pydantic import BaseModel, ConfigDict
from typing import List
from datetime import datetime
from ..products.schemas import Product # Import product schema for nesting

# Schema for an individual item within an order
class OrderItem(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: Product  # Nest the full product details

    model_config = ConfigDict(from_attributes=True)

# Schema for a full order, used for display
class Order(BaseModel):
    id: int
    user_id: int
    order_date: datetime
    items: List[OrderItem] = [] # A list of OrderItem schemas
    
    # We can add a calculated property for the total price
    total_price: float

    model_config = ConfigDict(from_attributes=True)