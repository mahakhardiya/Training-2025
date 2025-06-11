def append_to_file(filename):
    with open(filename, 'a') as file:
        data = input("Enter text to append: ")
        file.write(data + '\n')
