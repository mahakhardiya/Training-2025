def is_palindrome(s):
    # Normalize the string: lowercase and remove spaces
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Example usage:
text = input("Enter a string: ")
if is_palindrome(text):
    print(f'"{text}" is a palindrome.')
else:
    print(f'"{text}" is not a palindrome.')
