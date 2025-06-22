# app/auth/crud.py

from sqlalchemy.orm import Session # type: ignore
from . import models, schemas

# from .utils import get_password_hash

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
        role=user.role,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_password(db: Session, user: models.User, new_password: str):
    """Updates a user's password."""
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password  # type: ignore
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
