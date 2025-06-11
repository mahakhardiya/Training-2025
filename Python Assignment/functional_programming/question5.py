def power_factory(exp):
    return lambda x: x ** exp

square = power_factory(2)
cube = power_factory(3)
print(square(4))  # 16
print(cube(2))    # 8
