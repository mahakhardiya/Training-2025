# app/orders/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
from ..auth.models import User
from ..cart.models import Cart
from ..products.models import Product

def create_order_from_cart(db: Session, user: User, cart: Cart):
    """Creates an order from the user's cart and then clears the cart."""
    if not cart.items:
        return None # Cannot create an empty order

    # Create the main Order record
    db_order = models.Order(owner=user)
    db.add(db_order)
    db.flush() # Use flush to get the db_order.id before the full commit

    total_price = 0.0

    # Create OrderItem records from CartItem records
    for cart_item in cart.items:
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity
        )
        db.add(db_order_item)
        
        # Calculate price for this item and add to total
        product = db.query(Product).filter(Product.id == cart_item.product_id).first()
        if product:
            total_price += product.price * cart_item.quantity

    # Clear the cart items
    for cart_item in cart.items:
        db.delete(cart_item)

    db.commit() # Commit all changes (order, items, cart clearing)

    # Manually add the calculated total_price to the SQLAlchemy object
    # before it's passed to Pydantic for serialization.
    db_order.total_price = total_price
    
    return db_order


def get_user_orders(db: Session, user: User):
    """Fetches all orders for a specific user."""
    orders = db.query(models.Order).filter(models.Order.user_id == user.id).all()
    
    # Calculate total_price for each order
    for order in orders:
        total_price = 0.0
        for item in order.items:
            total_price += item.product.price * item.quantity
        order.total_price = total_price
        
    return orders