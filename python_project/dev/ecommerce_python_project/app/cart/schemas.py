# app/cart/schemas.py

from pydantic import BaseModel, ConfigDict
from typing import List
from ..products.schemas import Product # Import the product schema

# Schema for an item in the cart, used for displaying
class CartItem(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: Product # Nest the full product details

    model_config = ConfigDict(from_attributes=True)

# Schema for the full cart, used for displaying
class Cart(BaseModel):
    id: int
    user_id: int
    items: List[CartItem] = [] # A list of CartItem schemas

    model_config = ConfigDict(from_attributes=True)

# Schema for adding an item to the cart
class AddToCart(BaseModel):
    product_id: int
    quantity: int = 1 # Default quantity to 1 if not provided