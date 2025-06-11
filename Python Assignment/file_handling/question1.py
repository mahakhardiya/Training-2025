def print_lines_with_numbers(filename):
    with open(filename, 'r') as file:
        for i, line in enumerate(file, 1):
            print(f"{i}: {line.strip()}")
