class CharIterable:
    def __init__(self, text):
        self.text = text
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.text):
            raise StopIteration
        char = self.text[self.index]
        self.index += 1
        return char

# Example:
for c in CharIterable("Hello"):
    print(c)
