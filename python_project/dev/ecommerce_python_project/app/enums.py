# app/enums.py
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    CANCELLED = "cancelled"