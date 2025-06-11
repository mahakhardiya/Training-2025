from collections import Counter

def char_frequency(filename):
    with open(filename, 'r') as file:
        text = file.read()
    return dict(Counter(text))
