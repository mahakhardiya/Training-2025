import time

def timeit(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Execution time of '{func.__name__}': {end - start:.6f} seconds")
        return result
    return wrapper

# Example usage:
@timeit
def example_function(seconds):
    time.sleep(seconds)
    return "Done sleeping"

print(example_function(2))
