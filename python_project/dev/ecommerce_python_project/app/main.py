# app/main.py

# The sys.path fix can be removed now if you like, but leaving it doesn't hurt.
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
if project_root not in sys.path:
    sys.path.insert(0, project_root)


from . import models

from .admin.routes import router as admin_router
from fastapi import FastAPI # type: ignore
from .auth.routes import router as auth_router
from .products.routes import router as product_router
from .orders.routes import router as order_router
from .cart.routes import router as cart_router
from .core.exceptions import generic_exception_handler
from .core.logging_config import setup_logging
from fastapi import FastAPI, HTTPException  # type: ignore
from .core.exceptions import generic_exception_handler, http_exception_handler

setup_logging()

app = FastAPI(title="E-commerce API")
app.add_exception_handler(Exception, generic_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler) # type: ignore

# Include routers
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(order_router)
app.include_router(cart_router)
app.include_router(admin_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the E-commerce API!"}
