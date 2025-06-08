# app/auth/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
from .utils import get_password_hash

def get_user_by_email(db: Session, email: str):
    """Fetches a user by their email address."""
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    """Creates a new user in the database."""
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    
    db.add(db_user)  # Add the new user object to the session
    db.commit()      # Commit the changes to the database
    db.refresh(db_user) # Refresh the object to get the new ID from the DB
    
    return db_user