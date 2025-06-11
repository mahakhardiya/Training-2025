class InvalidAgeError(Exception):
    pass

def validate_age(age):
    if age < 0 or age > 120:
        raise InvalidAgeError("Age must be between 0 and 120.")

try:
    age = int(input("Enter your age: "))
    validate_age(age)
    print("Age is valid.")
except InvalidAgeError as e:
    print("InvalidAgeError:", e)
