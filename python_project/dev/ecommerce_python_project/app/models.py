# app/models.py

# Import the Base from the database configuration
from .core.database import Base

# Import all the models, so that Base has them registered
from .auth.models import User
from .products.models import Product
from .orders.models import Order, OrderItem
# app/models.py
# ... (keep existing imports)
from .cart.models import Cart, CartItem