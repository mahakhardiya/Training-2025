import random
import string

def generate_password(length):
    if length < 4:
        return "Password should be at least 4 characters long."

    # Combine all possible characters
    characters = string.ascii_letters + string.digits + string.punctuation

    # Randomly choose characters for the password
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

# Example usage:
length = int(input("Enter desired password length: "))
print("Generated password:", generate_password(length))
