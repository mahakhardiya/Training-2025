def text_stats(text):
    lines = text.splitlines()
    words = text.split()
    return {
        'lines': len(lines),
        'words': len(words),
        'characters': len(text)
    }

# Example
sample = "Hello World\nPython is fun."
print(text_stats(sample))  # Output: {'lines': 2, 'words': 5, 'characters': 25}
