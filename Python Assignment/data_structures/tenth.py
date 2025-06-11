def phonebook_app():
    phonebook = {}

    while True:
        print("\n1. Add Contact\n2. Search Contact\n3. Display All\n4. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            name = input("Enter name: ")
            number = input("Enter phone number: ")
            phonebook[name] = number
            print("Contact added.")

        elif choice == '2':
            name = input("Enter name to search: ")
            if name in phonebook:
                print(f"{name}'s number: {phonebook[name]}")
            else:
                print("Contact not found.")

        elif choice == '3':
            if phonebook:
                for name, number in phonebook.items():
                    print(f"{name}: {number}")
            else:
                print("Phonebook is empty.")

        elif choice == '4':
            print("Exiting phonebook.")
            break

        else:
            print("Invalid choice. Try again.")

# Uncomment to run
# phonebook_app()
