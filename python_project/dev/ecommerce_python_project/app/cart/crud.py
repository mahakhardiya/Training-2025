# app/cart/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
from ..auth.models import User

def get_user_cart(db: Session, user: User):
    """Gets a user's cart, creating one if it doesn't exist."""
    cart = db.query(models.Cart).filter(models.Cart.user_id == user.id).first()
    if not cart:
        cart = models.Cart(owner=user)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart

def add_item_to_cart(db: Session, cart: models.Cart, item: schemas.AddToCart):
    """Adds a product to the cart or updates its quantity."""
    # Check if this product is already in the cart
    db_cart_item = db.query(models.CartItem).filter(
        models.CartItem.cart_id == cart.id,
        models.CartItem.product_id == item.product_id
    ).first()

    if db_cart_item:
        # If it exists, update the quantity
        db_cart_item.quantity += item.quantity # type: ignore
    else:
        # If it doesn't exist, create a new cart item
        db_cart_item = models.CartItem(
            cart_id=cart.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
    
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return get_user_cart(db, cart.owner) # Return the whole updated cart

def remove_item_from_cart(db: Session, cart: models.Cart, product_id: int):
    """Removes an item from the cart."""
    db_cart_item = db.query(models.CartItem).filter(
        models.CartItem.cart_id == cart.id,
        models.CartItem.product_id == product_id
    ).first()

    if db_cart_item:
        db.delete(db_cart_item)
        db.commit()
    
    return get_user_cart(db, cart.owner) # Return the whole updated cart