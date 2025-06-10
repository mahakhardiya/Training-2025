# app/auth/utils.py
from functools import wraps
from passlib.context import CryptContext
from jose import JWTError, jwt

from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.enums import UserRole

from ..core.config import settings
from ..core.database import get_db
from . import crud, models, schemas

# This tells FastAPI where to look for the token.
# The tokenUrl is the path to our login endpoint.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/signin")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire, "scope": "access_token"})  # <-- ADD SCOPE
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


# --- NEW FUNCTION ---
def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Default to 7 days if not provided
        expire = datetime.now(timezone.utc) + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )

    to_encode.update({"exp": expire, "scope": "refresh_token"})  # <-- ADD SCOPE
    # Use the REFRESH_SECRET_KEY for signing
    encoded_jwt = jwt.encode(
        to_encode, settings.REFRESH_SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        # --- SCOPE CHECK ---
        if payload.get("scope") != "access_token":
            raise credentials_exception
        # -------------------

        email: str = payload.get("sub")  # type: ignore
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception

    user = crud.get_user_by_email(db, email=token_data.email)  # type: ignore
    if user is None:
        raise credentials_exception

    return user


def role_required(required_role: UserRole):
    """
    A decorator-like dependency to check for a specific user role.
    """

    def role_checker(current_user: models.User = Depends(get_current_user)):
        if current_user.role != required_role:  # type: ignore
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Requires {required_role.value} role.",
            )
        return current_user

    return role_checker


def create_password_reset_token(email: str) -> str:
    """
    Generates a secure, short-lived token for password reset.
    """
    # Token is valid for 15 minutes
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode = {
        "exp": expire,
        "sub": email,
        "scope": "password_reset",  # Crucial: scope limits token's purpose
    }
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> str | None:
    """
    Verifies the password reset token.
    Returns the email if the token is valid and correctly scoped, otherwise None.
    """
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        # Security Check: Ensure this token is ONLY for password resets
        if payload.get("scope") != "password_reset":
            return None

        email: str = payload.get("sub")  # type: ignore
        return email
    except JWTError:
        # Token is invalid, expired, or has a bad signature
        return None
