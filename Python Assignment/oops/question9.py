class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

class Member:
    def __init__(self, name):
        self.name = name
        self.books = []

    def borrow(self, book):
        self.books.append(book)

    def return_book(self, book):
        if book in self.books:
            self.books.remove(book)
