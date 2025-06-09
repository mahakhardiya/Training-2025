# app/main.py

# The sys.path fix can be removed now if you like, but leaving it doesn't hurt.
import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
if project_root not in sys.path:
    sys.path.insert(0, project_root)


# --- START OF THE FIX ---
# Import the master models file here.
# This ensures all SQLAlchemy models are loaded and registered before any routes
# that might depend on them are imported.
from . import models
# --- END OF THE FIX ---

from .admin.routes import router as admin_router
from fastapi import FastAPI
from .auth.routes import router as auth_router
from .products.routes import router as product_router
from .orders.routes import router as order_router
from .cart.routes import router as cart_router

app = FastAPI(title="E-commerce API")

# Include routers
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(order_router)
app.include_router(cart_router)
app.include_router(admin_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the E-commerce API!"}