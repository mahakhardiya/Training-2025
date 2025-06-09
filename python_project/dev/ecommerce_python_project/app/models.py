# app/models.py

# Import the Base from the database configuration
from .core.database import Base

# Import all the models, so that Base has them registered
from .auth.models import User
from .products.models import Product
from .orders.models import Order, OrderItem
from .cart.models import CartItem # <-- Corrected line
from .auth.password_reset_models import PasswordResetToken