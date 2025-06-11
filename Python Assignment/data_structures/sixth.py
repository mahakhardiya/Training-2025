class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)  # Add item to the top

    def pop(self):
        if not self.is_empty():
            return self.items.pop()  # Remove and return top item
        return "Stack is empty"

    def peek(self):
        if not self.is_empty():
            return self.items[-1]  # Return top item without removing
        return "Stack is empty"

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        return self.items

# Example usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

print("Stack:", stack.display())
print("Peek:", stack.peek())
print("Pop:", stack.pop())
print("After Pop:", stack.display())
