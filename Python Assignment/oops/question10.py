class A:
    def show(self):
        print("A")

class B(A):
    def show(self):
        print("B")

class C(A):
    def show(self):
        print("C")

class D(B, C):  # Multiple Inheritance
    pass

# MRO: D -> B -> C -> A
d = D()
d.show()  # prints "B"
