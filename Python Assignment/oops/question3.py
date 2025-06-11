class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades  # list of numbers

    def average(self):
        return sum(self.grades) / len(self.grades)
