# app/orders/routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..core.database import get_db
from ..auth import utils as auth_utils
from ..auth.models import User
from ..cart import crud as cart_crud
from . import crud, schemas

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/", response_model=schemas.Order, status_code=status.HTTP_201_CREATED)
def checkout(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """
    Create an order from the user's shopping cart.
    This will convert all cart items into an order and clear the cart.
    """
    cart = cart_crud.get_user_cart(db, user=current_user)
    if not cart.items:
        raise HTTPException(status_code=400, detail="Cannot checkout with an empty cart.")
        
    order = crud.create_order_from_cart(db, user=current_user, cart=cart)
    return order

@router.get("/", response_model=List[schemas.Order])
def get_order_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    """Retrieve the current user's order history."""
    return crud.get_user_orders(db, user=current_user)