words = ["level", "hello", "radar", "world"]
palindromes = (word for word in words if word == word[::-1])

# Example:
print(list(palindromes))
