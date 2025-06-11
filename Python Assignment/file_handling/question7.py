import csv

def column_averages(filename):
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        headers = next(reader)
        cols = list(zip(*[map(float, row) for row in reader]))
        return {headers[i]: sum(col) / len(col) for i, col in enumerate(cols)}
