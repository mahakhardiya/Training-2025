import java.util.Scanner;

public class VowelCounter {
    // Method to count vowels in a string
    public static int countVowels(String str) {
        int count = 0;
        str = str.toLowerCase(); // Convert to lowercase for case-insensitive comparison

        // Iterate through each character in the string
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                count++; // Increment count if character is a vowel
            }
        }
        return count;
    }

    // Main method to test the function
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input string from user
        System.out.print("Enter a string: ");
        String inputString = scanner.nextLine();

        // Count vowels and display result
        int vowelCount = countVowels(inputString);
        System.out.println("Number of vowels: " + vowelCount);

        scanner.close();
    }
}
