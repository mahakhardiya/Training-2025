from contextlib import contextmanager

@contextmanager
def open_file(name):
    try:
        f = open(name, 'r')
        yield f
    finally:
        f.close()

# Example:
# with open_file("sample.txt") as f:
#     print(f.read())
