# app/orders/crud.py
from sqlalchemy.orm import Session
from . import models
from ..auth.models import User
from ..cart.models import CartItem as CartModel # Import the cart model
from ..products.models import Product

def create_order_from_cart(db: Session, user: User):
    cart_items = db.query(CartModel).filter(CartModel.user_id == user.id).all()
    if not cart_items:
        return None 

    total_amount = 0.0
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            total_amount += product.price * item.quantity

    # Create the main Order record with the calculated total
    db_order = models.Order(
        owner=user,
        total_amount=total_amount
    )
    db.add(db_order)
    db.flush()

    # Create OrderItem records and check stock
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product or product.stock < item.quantity: # type: ignore
            # In a real app, you'd raise an HTTPException here
            # For simplicity, we'll just skip, but this is where stock check goes
            db.rollback() # Important: undo the order creation
            return "INSUFFICIENT_STOCK"
        
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=product.price # Save the current price
        )
        db.add(db_order_item)
        
        # Decrement stock
        product.stock -= item.quantity # type: ignore
        db.add(product)

    # Clear the cart items for this user
    db.query(CartModel).filter(CartModel.user_id == user.id).delete()

    db.commit()
    db.refresh(db_order)
    return db_order

def get_user_orders(db: Session, user: User):
    return db.query(models.Order).filter(models.Order.user_id == user.id).order_by(models.Order.created_at.desc()).all()