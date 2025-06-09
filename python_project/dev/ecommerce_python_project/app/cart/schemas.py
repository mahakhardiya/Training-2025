# app/cart/schemas.py

from pydantic import BaseModel, ConfigDict
from typing import List
from ..products.schemas import Product

# This schema now represents a single row in our 'cart' table.
class CartItem(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: Product

    model_config = ConfigDict(from_attributes=True)

# This schema is used for adding items
class AddToCart(BaseModel):
    product_id: int
    quantity: int = 1