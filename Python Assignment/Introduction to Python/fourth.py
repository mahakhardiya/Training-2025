# taking input
number = input("Enter the number to reverse: ")

# check if negative
if number.startswith('-'):
    reversed_number = '-' + number[:0:-1]  # reverse from the end, skip the '-' at index 0
else:
    reversed_number = number[::-1]

print("Reversed number:", reversed_number)
