def process(numbers):
    return list(map(lambda x: x*2, filter(lambda x: x % 2 == 0, numbers)))

print(process([1, 2, 3, 4, 5]))  # Output: [4, 8]
