# app/admin/routes.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..auth import utils as auth_utils
from ..auth import models as auth_models
from ..auth import schemas as auth_schemas
from ..orders import models as order_models
from ..orders import schemas as order_schemas
from ..enums import UserRole, OrderStatus

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    # This dependency applies to ALL routes in this router
    dependencies=[Depends(auth_utils.role_required(UserRole.ADMIN))],
)

# --- User Management ---


@router.get("/users", response_model=List[auth_schemas.User])
def get_all_users(db: Session = Depends(get_db)):
    """
    [Admin Only] Get a list of all users.
    """
    users = db.query(auth_models.User).all()
    return users


# --- Order Management ---


@router.get("/orders", response_model=List[order_schemas.Order])
def get_all_orders(db: Session = Depends(get_db)):
    """
    [Admin Only] Get a list of all orders from all users.
    """
    orders = db.query(order_models.Order).all()
    return orders


@router.put("/orders/{order_id}/status", response_model=order_schemas.Order)
def update_order_status(
    order_id: int,
    new_status: OrderStatus,  # FastAPI will validate this against the enum
    db: Session = Depends(get_db),
):
    """
    [Admin Only] Update the status of an order.
    """
    order = (
        db.query(order_models.Order).filter(order_models.Order.id == order_id).first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = new_status  # type: ignore
    db.commit()
    db.refresh(order)
    return order
