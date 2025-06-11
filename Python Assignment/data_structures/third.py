def remove_duplicates(lst):
    seen = set()
    unique = []
    for item in lst:
        if item not in seen:
            unique.append(item)
            seen.add(item)
    return unique

# Example usage
original = [1, 2, 2, 3, 4, 3, 5, 1]
result = remove_duplicates(original)
print("Original List:", original)
print("Without Duplicates:", result)
