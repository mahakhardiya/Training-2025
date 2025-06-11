def reverse_list(lst):
    reversed_lst = []
    for item in lst:
        reversed_lst = [item] + reversed_lst  # prepend each item
    return reversed_lst

# Example usage
original = [1, 2, 3, 4, 5]
reversed_result = reverse_list(original)
print("Original List:", original)
print("Reversed List:", reversed_result)
