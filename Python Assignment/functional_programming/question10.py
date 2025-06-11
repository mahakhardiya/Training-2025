def compose(*functions):
    def composed(value):
        for f in reversed(functions):
            value = f(value)
        return value
    return composed

# Example:
add2 = lambda x: x + 2
mul3 = lambda x: x * 3

composed_func = compose(mul3, add2)  # mul3(add2(x))
print(composed_func(4))  # Output: 18
