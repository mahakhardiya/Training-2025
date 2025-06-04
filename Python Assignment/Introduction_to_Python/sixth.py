# Simple Calculator: supports +, -, *, /

def calculate(expression):
    try:
        # Remove spaces and extract operands and operator
        expression = expression.strip()
        
        if '+' in expression:
            a, b = expression.split('+')
            result = float(a) + float(b)
        elif '-' in expression:
            a, b = expression.split('-')
            result = float(a) - float(b)
        elif '*' in expression:
            a, b = expression.split('*')
            result = float(a) * float(b)
        elif '/' in expression:
            a, b = expression.split('/')
            if float(b) == 0:
                return "Error: Division by zero."
            result = float(a) / float(b)
        else:
            return "Unsupported operation."

        return f"Result: {result}"
    
    except ValueError:
        return "Invalid input. Use format like: 5 + 3"
    except Exception as e:
        return f"An error occurred: {e}"

# Get input from user
user_input = input("Enter calculation: ")
print(calculate(user_input))
