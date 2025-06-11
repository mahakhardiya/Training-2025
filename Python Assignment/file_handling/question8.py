from datetime import datetime

def write_log(filename, message):
    with open(filename, 'a') as file:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        file.write(f"[{timestamp}] {message}\n")
