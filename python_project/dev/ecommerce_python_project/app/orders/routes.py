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
    order = crud.create_order_from_cart(db, user=current_user)
    if order is None:
        raise HTTPException(status_code=400, detail="Cannot checkout with an empty cart.")
    if order == "INSUFFICIENT_STOCK":
        raise HTTPException(status_code=400, detail="Insufficient stock for one or more items.")
    return order

@router.get("/", response_model=List[schemas.Order])
def get_order_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_utils.get_current_user)
):
    return crud.get_user_orders(db, user=current_user)