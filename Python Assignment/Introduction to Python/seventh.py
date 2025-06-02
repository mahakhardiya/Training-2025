# Function to check if a number is prime
def is_prime(n):
    if n <= 1:
        return False
    elif n == 2:
        return True  # 2 is the only even prime number
    elif n % 2 == 0:
        return False

    # Check for factors from 3 to √n
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False

    return True

# Take input from user
num = int(input("Enter a number: "))

# Print result
if is_prime(num):
    print(f"{num} is a prime number.")
else:
    print(f"{num} is not a prime number.")
