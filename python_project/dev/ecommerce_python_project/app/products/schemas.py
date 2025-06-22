# app/products/schemas.py

from pydantic import BaseModel, ConfigDict, Field # type: ignore

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float = Field(
        gt=0, description="The price of the product, must be greater than 0"
    )
    stock: int = Field(ge=0, description="The stock quantity, must be 0 or greater")
    category: str
    image_url: str | None = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
