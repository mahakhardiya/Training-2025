def cartesian_product(list1, list2):
    for a in list1:
        for b in list2:
            yield (a, b)

# Example:
print(list(cartesian_product([1, 2], ['a', 'b'])))
