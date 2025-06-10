# check_env.py
import sys
import os

print("--- Python Environment Sanity Check ---")

# 1. Which Python interpreter is running this script?
print(f"\n[1] Python Executable: {sys.executable}")

# 2. What is the Current Working Directory (CWD)?
try:
    cwd = os.getcwd()
    print(f"\n[2] Current Working Directory: {cwd}")
except Exception as e:
    print(f"\n[2] FAILED to get CWD: {e}")
    cwd = ""

# 3. What is in the sys.path list?
print("\n[3] sys.path contents:")
for i, path_item in enumerate(sys.path):
    print(f"    {i}: {path_item}")

# 4. CRITICAL TEST: Is the CWD in sys.path?
#    The first item (sys.path[0]) should be the CWD.
#    In some cases it can be an empty string '' which also means the CWD.
is_cwd_in_path = False
if sys.path and (sys.path[0] == cwd or sys.path[0] == ""):
    is_cwd_in_path = True

print(
    f"\n[4] Is CWD in sys.path? {'YES' if is_cwd_in_path else 'NO <--- THIS IS THE PROBLEM'}"
)

# 5. From Python's perspective, what files/folders are in the CWD?
print("\n[5] Directory listing of CWD from within Python:")
if cwd:
    try:
        dir_contents = os.listdir(cwd)
        if not dir_contents:
            print("    <Directory is empty or unreadable>")
        else:
            for item in dir_contents:
                print(f"    - {item}")

        # 6. CRITICAL TEST: Can Python see the 'app' folder?
        is_app_folder_visible = "app" in dir_contents
        print(
            f"\n[6] Can Python see the 'app' folder here? {'YES' if is_app_folder_visible else 'NO <--- THIS IS ALSO THE PROBLEM'}"
        )

    except Exception as e:
        print(f"    FAILED to list directory contents: {e}")
else:
    print("    Skipping directory listing because CWD could not be determined.")

print("\n--- End of Check ---")
