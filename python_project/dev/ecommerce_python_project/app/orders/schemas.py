# app/orders/schemas.py
from pydantic import BaseModel, ConfigDict
from typing import List
from datetime import datetime
from ..products.schemas import Product
from ..enums import OrderStatus # Import the enum

# This schema is now for responses only
class OrderItem(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_purchase: float # Use the stored price
    product: Product

    model_config = ConfigDict(from_attributes=True)

# This schema is for responses only
class Order(BaseModel):
    id: int
    created_at: datetime
    status: OrderStatus
    items: List[OrderItem] = []

    model_config = ConfigDict(from_attributes=True)