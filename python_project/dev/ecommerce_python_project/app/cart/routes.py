# app/cart/routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List # <-- Import List

from ..core.database import get_db
from ..auth import utils as auth_utils
from ..auth.models import User
from . import crud, schemas

router = APIRouter(
    prefix="/cart",
    tags=["Shopping Cart"]
)

# The response is now a list of cart items, not a single cart object
@router.get("/", response_model=List[schemas.CartItem])
def view_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """View all items in the current user's shopping cart."""
    return crud.get_user_cart_items(db, user=current_user)

@router.post("/items", response_model=schemas.CartItem)
def add_to_cart(
    item: schemas.AddToCart,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """Add an item to the cart or update the quantity if it already exists."""
    # We could add logic here to check if product exists and if stock is sufficient
    return crud.add_item_to_cart(db, user=current_user, item=item)

@router.delete("/items/{product_id}")
def remove_from_cart(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """Remove an item from the cart."""
    result = crud.remove_item_from_cart(db, user=current_user, product_id=product_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    return {"message": "Item removed successfully"}