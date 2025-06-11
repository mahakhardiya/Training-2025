def merge_dicts(dict1, dict2):
    merged = dict1.copy()   # create a copy to avoid modifying original
    merged.update(dict2)    # add items from dict2
    return merged

# Example usage
a = {'x': 1, 'y': 2}
b = {'y': 3, 'z': 4}

result = merge_dicts(a, b)
print(result)  # Output: {'x': 1, 'y': 3, 'z': 4}
