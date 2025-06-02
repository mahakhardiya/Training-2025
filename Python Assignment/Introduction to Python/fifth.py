# Taking input
a = int(input("Enter the a: "))
b = int(input("Enter the b: "))

# Swapping without using a third variable
a = a + b
b = a - b
a = a - b

# Showing result
print("After swapping:")
print("a =", a)
print("b =", b)
