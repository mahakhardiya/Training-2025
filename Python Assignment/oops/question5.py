class Counter:
    count = 0  # class variable

    def __init__(self):
        Counter.count += 1

    @classmethod
    def get_count(cls):
        return cls.count
