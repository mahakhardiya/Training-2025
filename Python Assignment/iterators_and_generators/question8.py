def infinite_fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Example (first 10 terms only to avoid infinite loop):
gen = infinite_fibonacci()
for _ in range(10):
    print(next(gen))
