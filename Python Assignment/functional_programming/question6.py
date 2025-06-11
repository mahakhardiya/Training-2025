def multiply(a):
    def inner(b):
        return a * b
    return inner

double = multiply(2)
print(double(5))  # 10
