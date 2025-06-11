def remove_empty_lines(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()
    with open(filename, 'w') as file:
        file.writelines([line for line in lines if line.strip()])
