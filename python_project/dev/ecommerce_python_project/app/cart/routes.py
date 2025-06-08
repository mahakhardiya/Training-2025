# app/cart/routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..auth import utils as auth_utils
from ..auth.models import User
from . import crud, schemas

router = APIRouter(
    prefix="/cart",
    tags=["Shopping Cart"]
)

@router.get("/", response_model=schemas.Cart)
def view_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """View the contents of the current user's shopping cart."""
    return crud.get_user_cart(db, user=current_user)

@router.post("/items", response_model=schemas.Cart)
def add_to_cart(
    item: schemas.AddToCart,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """Add an item to the cart or update the quantity if it already exists."""
    cart = crud.get_user_cart(db, user=current_user)
    return crud.add_item_to_cart(db, cart=cart, item=item)

@router.delete("/items/{product_id}", response_model=schemas.Cart)
def remove_from_cart(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """Remove an item from the cart."""
    cart = crud.get_user_cart(db, user=current_user)
    return crud.remove_item_from_cart(db, cart=cart, product_id=product_id)