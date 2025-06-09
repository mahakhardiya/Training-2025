# app/products/routes.py

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..auth import utils as auth_utils
from ..auth import models as auth_models
from . import crud, schemas
from ..enums import UserRole

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

# Endpoint 1: Product Listing with Filters and Pagination
@router.get("/", response_model=List[schemas.Product])
def list_products(
    db: Session = Depends(get_db),
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = None, # e.g., "price_asc", "price_desc"
    page: int = 1,
    page_size: int = Query(default=20, le=100) # Default 20, max 100
):
    skip = (page - 1) * page_size
    products = crud.get_filtered_products(
        db=db, 
        skip=skip, 
        limit=page_size,
        category=category,
        min_price=min_price,
        max_price=max_price,
        sort_by=sort_by
    )
    return products

# Endpoint 2: Dedicated Product Search
@router.get("/search", response_model=List[schemas.Product])
def search_for_products(
    keyword: str,
    db: Session = Depends(get_db)
):
    if not keyword.strip():
        raise HTTPException(status_code=400, detail="Search keyword cannot be empty.")
    products = crud.search_products(db=db, keyword=keyword)
    return products

# Endpoint 3: Product Detail View
@router.get("/{product_id}", response_model=schemas.Product)
def get_product_detail(
    product_id: int, 
    db: Session = Depends(get_db)
):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

# --- Create, Update, Delete routes remain unchanged below this line ---

@router.post("/", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_new_product(
    product: schemas.ProductCreate, 
    db: Session = Depends(get_db), 
    current_admin: auth_models.User = Depends(auth_utils.role_required(UserRole.ADMIN))
):
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