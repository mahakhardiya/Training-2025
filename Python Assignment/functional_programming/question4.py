def apply_function(func, items):
    return [func(item) for item in items]

result = apply_function(lambda x: x**2, [1, 2, 3])
print(result)  # [1, 4, 9]
