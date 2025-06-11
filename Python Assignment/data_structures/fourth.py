def count_word_frequencies(word_list):
    freq = {}
    for word in word_list:
        if word in freq:
            freq[word] += 1
        else:
            freq[word] = 1
    return freq

# Example usage
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
result = count_word_frequencies(words)
print(result)
