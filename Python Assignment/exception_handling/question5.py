try:
    file = open("sample.txt", "r")
    print(file.read())
except FileNotFoundError:
    print("File not found.")
finally:
    try:
        file.close()
    except NameError:
        pass
