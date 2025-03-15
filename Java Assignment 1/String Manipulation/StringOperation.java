import java.util.Arrays;
import java.util.Scanner;

public class StringOperation {

    public static String reverseString(String str) {
        return new StringBuilder(str).reverse().toString();
    }

    public static int countVowels(String str) {
        int count = 0;
        String vowels = "AEIOUaeiou";
        for (char c : str.toCharArray()) {
            if (vowels.indexOf(c) != -1) {
                count++;
            }
        }
        return count;
    }

    public static boolean areAnagrams(String str1, String str2) {
        char[] arr1 = str1.replaceAll("\\s", "").toLowerCase().toCharArray();
        char[] arr2 = str2.replaceAll("\\s", "").toLowerCase().toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        return Arrays.equals(arr1, arr2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Reverse a string
        System.out.print("Enter a string to reverse: ");
        String inputString = sc.nextLine();
        System.out.println("Reversed String: " + reverseString(inputString));

        // Count vowels
        System.out.print("\nEnter a string to count vowels: ");
        String vowelString = sc.nextLine();
        System.out.println("Number of vowels: " + countVowels(vowelString));

        // Check for anagrams
        System.out.print("\nEnter first string for anagram check: ");
        String str1 = sc.nextLine();
        System.out.print("Enter second string for anagram check: ");
        String str2 = sc.nextLine();
        if (areAnagrams(str1, str2)) {
            System.out.println("The strings are anagrams.");
        } else {
            System.out.println("The strings are NOT anagrams.");
        }

        sc.close();
    }
}
