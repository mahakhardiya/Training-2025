# app/utils/email.py

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig # type: ignore
from pydantic import EmailStr
from typing import List
from ..core.config import settings
import logging

logger = logging.getLogger("app.email")

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME, # type: ignore
    MAIL_PASSWORD=settings.MAIL_PASSWORD, # type: ignore
    MAIL_FROM=settings.MAIL_FROM, # type: ignore
    MAIL_PORT=settings.MAIL_PORT, # type: ignore
    MAIL_SERVER=settings.MAIL_SERVER, # type: ignore
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME, # type: ignore
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_email(email: List[EmailStr], subject: str, message_body: str):
    """
    Sends an email using fastapi-mail.
    """
    message = MessageSchema(
        subject=subject,
        recipients=email,
        body=message_body,
        subtype="html"
    )
    
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        logger.info(f"Email sent to {email[0]}")
    except Exception as e:
        logger.error(f"Failed to send email to {email[0]}: {e}")