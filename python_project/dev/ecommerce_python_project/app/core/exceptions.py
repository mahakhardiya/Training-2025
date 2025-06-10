# app/core/exceptions.py

import logging
from fastapi import Request
from fastapi.responses import JSONResponse

# Get the logger instance
logger = logging.getLogger(__name__)

async def generic_exception_handler(request: Request, exc: Exception):
    """
    This is a generic exception handler.
    It catches any unhandled exception and returns a 500 status code.
    It also logs the exception for debugging purposes.
    """
    # Log the exception with traceback
    logger.error(
        f"Unhandled exception for request {request.method} {request.url}",
        exc_info=exc, # This adds traceback information to the log
        extra={"request": request}
    )
    
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )