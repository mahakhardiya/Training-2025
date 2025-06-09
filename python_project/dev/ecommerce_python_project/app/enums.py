# app/enums.py
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"