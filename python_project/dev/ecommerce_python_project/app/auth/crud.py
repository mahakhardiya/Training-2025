# app/auth/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
#from .utils import get_password_hash

from .hashing import get_password_hash 

def get_user_by_email(db: Session, email: str):
    """Fetches a user by their email address."""
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    # Add the new fields when creating the User model instance
    db_user = models.User(
        name=user.name, 
        email=user.email, 
        hashed_password=hashed_password, 
        role=user.role
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user