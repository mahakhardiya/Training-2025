
#Taking inputs
num1 = int(input("Enter number 1: "))
num2 = int(input("Enter number 2: "))
num3 = int(input("Enter number 3: "))

#Finding the largest
if num1 >= num2 and num1 >= num3:
    largest = num1
elif num2 >= num3:
    largest = num2
else:
    largest = num3

print(f"Largest Number is {largest}")