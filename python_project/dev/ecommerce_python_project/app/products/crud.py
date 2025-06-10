# app/products/crud.py

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from typing import Optional
from . import models, schemas


def get_product(db: Session, product_id: int):
    """Fetches a single product by its ID."""
    # Using joinedload can be more efficient if you often access related models
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def get_filtered_products(
    db: Session,
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = None,
):
    """
    Fetches products with filtering, sorting, and pagination.
    """
    query = db.query(models.Product)

    if category:
        query = query.filter(models.Product.category == category)
    if min_price is not None:
        query = query.filter(models.Product.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Product.price <= max_price)

    # Sorting logic
    if sort_by:
        if sort_by == "price_asc":
            query = query.order_by(models.Product.price.asc())
        elif sort_by == "price_desc":
            query = query.order_by(models.Product.price.desc())
        # Add more sort options as needed, e.g., by name
        elif sort_by == "name_asc":
            query = query.order_by(models.Product.name.asc())

    products = query.offset(skip).limit(limit).all()
    return products

def search_products(db: Session, keyword: str):
    """
    Searches for products by keyword in name and description.
    """
    search_term = f"%{keyword}%"
    products = (
        db.query(models.Product)
        .filter(
            or_(
                models.Product.name.ilike(search_term),
                models.Product.description.ilike(search_term),
            )
        )
        .all()
    )
    return products

# --- Create, Update, Delete functions remain unchanged ---

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        category=product.category,
        image_url=product.image_url,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    update_data = product_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int):
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    db.delete(db_product)
    db.commit()
    return db_product
