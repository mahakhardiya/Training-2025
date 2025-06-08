# app/products/routes.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..auth import utils as auth_utils
from ..auth import models as auth_models
from . import crud, schemas

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

# PUBLIC ROUTE: Get all products
@router.get("/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

# PUBLIC ROUTE: Get a single product by ID
@router.get("/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

# PROTECTED ROUTE: Create a new product
@router.post("/", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_new_product(
    product: schemas.ProductCreate, 
    db: Session = Depends(get_db), 
    current_user: auth_models.User = Depends(auth_utils.get_current_user)
):
    # In a real app, you might add a check here to see if current_user is an admin
    return crud.create_product(db=db, product=product)

# PROTECTED ROUTE: Update a product
@router.put("/{product_id}", response_model=schemas.Product)
def update_existing_product(
    product_id: int, 
    product_update: schemas.ProductUpdate, 
    db: Session = Depends(get_db),
    current_user: auth_models.User = Depends(auth_utils.get_current_user)
):
    db_product = crud.update_product(db, product_id, product_update)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

# PROTECTED ROUTE: Delete a product
@router.delete("/{product_id}", response_model=schemas.Product)
def delete_existing_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: auth_models.User = Depends(auth_utils.get_current_user)
):
    db_product = crud.delete_product(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product