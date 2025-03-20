import java.util.Scanner;

public class StringReversal {
    // Method to reverse a string using a loop
    public static String reverseString(String str) {
        String reversed = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i); // Append characters in reverse order
        }
        return reversed;
    }

    // Main method to test the function
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input string from user
        System.out.print("Enter a string: ");
        String inputString = scanner.nextLine();

        // Reverse the string and display the result
        String reversed = reverseString(inputString);
        System.out.println("Reversed String: " + reversed);

        scanner.close();
    }
}
