def all_substrings(s):
    return [s[i:j] for i in range(len(s)) for j in range(i + 1, len(s) + 1)]

# Example
print(all_substrings("abc"))  # Output: ['a', 'ab', 'abc', 'b', 'bc', 'c']
