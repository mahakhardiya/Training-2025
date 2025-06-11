try:
    x = int("abc")
except ValueError as ve:
    raise RuntimeError("Failed to parse integer") from ve
