try:
    num = int(input("Enter a number: "))
    try:
        result = 10 / num
        print("Result:", result)
    except ZeroDivisionError:
        print("Division by zero not allowed.")
except ValueError:
    print("Please enter a valid integer.")
