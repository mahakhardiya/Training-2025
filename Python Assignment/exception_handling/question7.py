import logging

logging.basicConfig(filename='error.log', level=logging.ERROR)

try:
    x = int(input("Enter number: "))
    print(10 / x)
except Exception as e:
    logging.error("Exception occurred", exc_info=True)
    print("An error occurred. Logged to file.")
