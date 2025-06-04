def fibonacci(n):
    if n <= 0:
        return "Input should be a positive integer."
    elif n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Example usage:
n = int(input("Enter the position (n) to get the Fibonacci number: "))
print(f"The {n}th Fibonacci number is {fibonacci(n)}")
