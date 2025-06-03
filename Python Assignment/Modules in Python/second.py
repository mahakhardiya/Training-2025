import math

# Input from user
num = float(input("Enter a number: "))
power = float(input("Enter the power to raise the number to: "))

# Calculations
square_root = math.sqrt(num)
factorial = math.factorial(int(num)) if num >= 0 and num.is_integer() else "Factorial only defined for non-negative integers"
power_result = math.pow(num, power)

# Output
print(f"Square root of {num} = {square_root}")
print(f"Factorial of {int(num)} = {factorial}")
print(f"{num} raised to the power {power} = {power_result}")
