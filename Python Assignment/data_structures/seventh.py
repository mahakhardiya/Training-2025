from collections import deque

class Queue:
    def __init__(self):
        self.queue = deque()

    def enqueue(self, item):
        self.queue.append(item)  # Add to the rear

    def dequeue(self):
        if not self.is_empty():
            return self.queue.popleft()  # Remove from the front
        return "Queue is empty"

    def is_empty(self):
        return len(self.queue) == 0

    def display(self):
        return list(self.queue)

# Example usage
q = Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)

print("Queue:", q.display())
print("Dequeue:", q.dequeue())
print("After Dequeue:", q.display())
