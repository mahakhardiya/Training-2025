# app/auth/routes.py

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks 
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from ..core.config import settings
from sqlalchemy.orm import Session
from datetime import timedelta
from ..utils import email as email_utils 

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

@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def request_password_reset(
    request_data: schemas.ForgotPasswordSchema,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Initiates a password reset request.
    Sends an email with a reset token if the user exists.
    """
    user = crud.get_user_by_email(db, email=request_data.email)
    
    # To prevent email enumeration attacks, we always return a success message.
    # The email is only sent if the user actually exists.
    if user:
        token = utils.create_password_reset_token(email=user.email) # type: ignore
        reset_link = f"http://your-frontend-domain.com/reset-password?token={token}"
        
        message_body = f"""
        <p>Hello {user.name},</p>
        <p>You requested a password reset for your account.</p>
        <p>Please click the link below to set a new password:</p>
        <p><a href="{reset_link}">{reset_link}</a></p>
        <p>This link is valid for 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        """
        
        # Use background tasks to send the email without blocking the response
        background_tasks.add_task(
            email_utils.send_email,
            email=[user.email], # type: ignore
            subject="Your Password Reset Request",
            message_body=message_body
        )
        
    return {"message": "If an account with this email exists, a password reset link has been sent."}

@router.post("/reset-password", status_code=status.HTTP_200_OK)
def perform_password_reset(
    request_data: schemas.ResetPasswordSchema, 
    db: Session = Depends(get_db)
):
    """
    Resets the user's password using a valid token.
    """
    email = utils.verify_password_reset_token(token=request_data.token)
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token.")
        
    user = crud.get_user_by_email(db, email=email)
    if not user:
        # This should be virtually impossible if the token is valid, but it's a good safeguard.
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token.")

    crud.update_password(db, user=user, new_password=request_data.new_password)
    return {"message": "Your password has been successfully reset."}
