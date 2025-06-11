def replace_vowels(s):
    vowels = "aeiouAEIOU"
    return ''.join(['*' if char in vowels else char for char in s])

# Example
print(replace_vowels("Hello World"))  # Output: H*ll* W*rld

