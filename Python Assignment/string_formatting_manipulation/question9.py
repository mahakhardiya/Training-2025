def longest_palindrome(s):
    n = len(s)
    if n == 0:
        return ""

    start = 0
    max_len = 1

    for i in range(n):
        for j in range(i + max_len, n + 1):
            substr = s[i:j]
            if substr == substr[::-1]:
                start = i
                max_len = j - i

    return s[start:start + max_len]

# Example
print(longest_palindrome("babad"))  # Output: bab or aba
