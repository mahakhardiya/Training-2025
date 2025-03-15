import java.util.Scanner;

public class largest {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Taking input from the user
        System.out.print("Enter the first number: ");
        int num1 = sc.nextInt();

        System.out.print("Enter the second number: ");
        int num2 = sc.nextInt();

        System.out.print("Enter the third number: ");
        int num3 = sc.nextInt();

        // Finding the largest number using if-else
        int largest;
        if (num1 >= num2 && num1 >= num3) {
            largest = num1;
        } else if (num2 >= num1 && num2 >= num3) {
            largest = num2;
        } else {
            largest = num3;
        }

        // Display the largest number
        System.out.println("The largest number is: " + largest);

        sc.close();
    }
}
