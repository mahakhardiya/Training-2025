def read_lines(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# Example:
# for line in read_lines("sample.txt"):
#     print(line)
