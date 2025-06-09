# app/products/crud.py

from sqlalchemy.orm import Session
from . import models, schemas

def get_product(db: Session, product_id: int):
    """Fetches a single product by its ID."""
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    """Fetches all products with pagination."""
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    """Creates a new product in the database."""
    db_product = models.Product(
        name=product.name,
        description=product.description,
        price=product.price,
        # --- NEW FIELDS ---
        stock=product.stock,
        category=product.category,
        image_url=product.image_url
        # ------------------
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    """Updates an existing product."""
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    
    # Get the update data from the Pydantic model
    update_data = product_update.model_dump(exclude_unset=True)
    
    # Update the model fields
    for key, value in update_data.items():
        setattr(db_product, key, value)
        
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    """Deletes a product."""
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    
    db.delete(db_product)
    db.commit()
    return db_product