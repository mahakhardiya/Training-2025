# app/core/exceptions.py
import logging
from fastapi import Request, status  # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from .schemas import ErrorResponse 
from fastapi import HTTPException # type: ignore

logger = logging.getLogger(__name__)

async def generic_exception_handler(request: Request, exc: Exception):
    """
    Catches any unhandled Exception and formats it into our standard error response.
    """
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    error_response = ErrorResponse(
        message="An internal server error occurred.",
        code=status_code
    )
    
    logger.error(
        f"Unhandled exception for request {request.method} {request.url}",
        exc_info=exc
    )
    
    return JSONResponse(
        status_code=status_code,
        content=error_response.model_dump()
    )

async def http_exception_handler(request: Request, exc: HTTPException):
    """
    Catches FastAPI's HTTPException and formats it into our standard error response.
    """
    error_response = ErrorResponse(
        message=exc.detail,
        code=exc.status_code
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response.model_dump(),
        headers=exc.headers
    )
