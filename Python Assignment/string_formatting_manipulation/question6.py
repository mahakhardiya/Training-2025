import re

def is_strong_password(password):
    return (len(password) >= 8 and
            re.search(r"[A-Z]", password) and
            re.search(r"[a-z]", password) and
            re.search(r"[0-9]", password) and
            re.search(r"[\W_]", password))

# Example
print(is_strong_password("Abcdef1@"))  # Output: True
