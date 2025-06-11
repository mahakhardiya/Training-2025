def is_list_palindrome(lst):
    return lst == lst[::-1]

# Example usage
sample_list = [1, 2, 3, 2, 1]
print("Is palindrome?", is_list_palindrome(sample_list))  # Output: True
