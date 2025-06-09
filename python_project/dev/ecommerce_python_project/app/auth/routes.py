# app/auth/routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from ..core.config import settings
from sqlalchemy.orm import Session
from datetime import timedelta

from .hashing import verify_password

from app.auth import models

from ..core.database import get_db
from ..core.config import settings
from . import crud, schemas, utils

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def signup_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return crud.create_user(db=db, user=user)

@router.post("/signin", response_model=schemas.Token)
def signin_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password): # type: ignore
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # --- GENERATE BOTH TOKENS ---
    access_token = utils.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    refresh_token = utils.create_refresh_token(data={"sub": user.email})
    # ----------------------------
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "refresh_token": refresh_token # <-- RETURN REFRESH TOKEN
    }

@router.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(utils.get_current_user)):
    """
    Fetch the current logged in user.
    """
    return current_user

@router.post("/refresh", response_model=schemas.Token)
def refresh_access_token(
    refresh_token: str = Depends(utils.oauth2_scheme), # We can reuse the scheme to get the token from the header # type: ignore
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Use the REFRESH_SECRET_KEY to decode
        payload = jwt.decode(refresh_token, settings.REFRESH_SECRET_KEY, algorithms=[settings.ALGORITHM]) # type: ignore
        
        # Check the scope
        if payload.get("scope") != "refresh_token":
            raise credentials_exception
            
        email: str = payload.get("sub") # type: ignore
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = crud.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    
    # Issue a new pair of tokens
    new_access_token = utils.create_access_token(data={"sub": user.email})
    new_refresh_token = utils.create_refresh_token(data={"sub": user.email})
    
    return {
        "access_token": new_access_token,
        "token_type": "bearer",
        "refresh_token": new_refresh_token
    }