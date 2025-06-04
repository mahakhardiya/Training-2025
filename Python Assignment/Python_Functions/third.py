def sum_and_average(numbers):
    total = sum(numbers)
    average = total / len(numbers) if numbers else 0
    return total, average

# Example usage:
nums = [10, 20, 30, 40, 50]
total, avg = sum_and_average(nums)
print(f"Sum: {total}, Average: {avg}")
