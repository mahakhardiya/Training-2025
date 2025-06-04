import os
import sys

# List all files in the current working directory
print("📂 Files in current directory:")
for file in os.listdir():
    print(" -", file)

print("\n🧾 Command-line Arguments:")

# Display command-line arguments
if len(sys.argv) > 1:
    for i, arg in enumerate(sys.argv[1:], start=1):
        print(f" Argument {i}: {arg}")
else:
    print(" No command-line arguments provided.")
