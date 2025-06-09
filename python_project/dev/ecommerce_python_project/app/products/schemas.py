# app/products/schemas.py

from pydantic import BaseModel, ConfigDict

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    # --- NEW FIELDS ---
    stock: int
    category: str
    image_url: str | None = None
    # ------------------

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    model_config = ConfigDict(from_attributes=True)