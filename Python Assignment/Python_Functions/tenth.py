def fibonacci_memo(n, memo={}):
    if n <= 0:
        return "Input should be a positive integer."
    if n in memo:
        return memo[n]
    if n == 1:
        memo[n] = 0
    elif n == 2:
        memo[n] = 1
    else:
        memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Example usage:
n = int(input("Enter the position (n) to get the Fibonacci number: "))
print(f"The {n}th Fibonacci number is {fibonacci_memo(n)}")
