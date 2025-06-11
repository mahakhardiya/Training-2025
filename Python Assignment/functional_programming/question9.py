def memoize(func):
    cache = {}
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    return wrapper

@memoize
def slow_square(n):
    print("Calculating...")
    return n * n

print(slow_square(4))  # Calculates
print(slow_square(4))  # Uses cache
