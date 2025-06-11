def sort_by_second_element(tuples_list):
    return sorted(tuples_list, key=lambda x: x[1])

# Example usage
data = [(1, 3), (4, 1), (2, 5), (3, 2)]
sorted_data = sort_by_second_element(data)

print("Original List:", data)
print
