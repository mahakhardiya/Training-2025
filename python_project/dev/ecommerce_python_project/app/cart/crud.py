# app/cart/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
from ..auth.models import User

def get_user_cart_items(db: Session, user: User):
    """Gets all cart items for a user."""
    return db.query(models.CartItem).filter(models.CartItem.user_id == user.id).all()

def add_item_to_cart(db: Session, user: User, item: schemas.AddToCart):
    """Adds a product to the user's cart or updates its quantity."""
    # Check if this user already has this product in their cart
    db_cart_item = db.query(models.CartItem).filter(
        models.CartItem.user_id == user.id,
        models.CartItem.product_id == item.product_id
    ).first()

    if db_cart_item:
        # If it exists, update the quantity
        db_cart_item.quantity += item.quantity # type: ignore
    else:
        # If it doesn't exist, create a new cart item
        db_cart_item = models.CartItem(
            user_id=user.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
    
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item

def remove_item_from_cart(db: Session, user: User, product_id: int):
    """Removes an item from the user's cart."""
    db_cart_item = db.query(models.CartItem).filter(
        models.CartItem.user_id == user.id,
        models.CartItem.product_id == product_id
    ).first()

    if db_cart_item:
        db.delete(db_cart_item)
        db.commit()
        return {"ok": True} # Return a success indicator
    
    return None # Indicate item was not found