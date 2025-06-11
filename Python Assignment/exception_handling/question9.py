def exception_logger(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(f"Exception in {func.__name__}: {e}")
    return wrapper

@exception_logger
def risky_function(x):
    return 10 / x

risky_function(0)
