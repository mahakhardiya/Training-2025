# app/products/schemas.py

from pydantic import BaseModel, ConfigDict

# Properties shared by all product-related schemas
class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float

# Properties to receive on item creation
class ProductCreate(ProductBase):
    pass # It has the same fields as ProductBase for now

# Properties to receive on item update
class ProductUpdate(ProductBase):
    pass # Also the same for now, but could differ later

# Properties to return to a client
class Product(ProductBase):
    id: int
    
    # Pydantic V2 config to allow creating from ORM model
    model_config = ConfigDict(from_attributes=True)