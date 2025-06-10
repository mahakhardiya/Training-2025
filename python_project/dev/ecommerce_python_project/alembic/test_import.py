# alembic/test_import.py
import os
import sys

# This is the EXACT same logic from your env.py
print("--- Testing Python Path ---")
current_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.insert(0, project_root)

print(f"Current script directory: {current_dir}")
print(f"Calculated project root: {project_root}")
print("Project root has been added to sys.path.")
print("\n--- Current sys.path ---")
print("\n".join(sys.path))
print("\n------------------------")


# Now, let's try the import that is failing
try:
    print("\nAttempting to import 'app.orders.models'...")
    from app.orders.models import Order, OrderItem  # type: ignore

    print("SUCCESS: 'app.orders.models' imported successfully!")
except ModuleNotFoundError as e:
    print(f"\nFAILURE: Could not import 'app.orders.models'.")
    print(f"Error: {e}")
except Exception as e:
    print(f"\nAn unexpected error occurred: {e}")
