# app/products/models.py

from sqlalchemy import Column, Integer, String, Float

from ..core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)

    stock = Column(Integer, nullable=False, default=0)
    category = Column(String, index=True)
    image_url = Column(String, nullable=True)