import java.util.Scanner;

public class question2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        int num1 = sc.nextInt();

        System.out.print("Enter second number: ");
        int num2 = sc.nextInt();

        System.out.println("\n 1. Arithmetic Operations:");
        System.out.println("Addition: " + (num1 + num2));
        System.out.println("Subtraction: " + (num1 - num2));
        System.out.println("Multiplication: " + (num1 * num2));
        System.out.println("Division: " + (num1 / num2));
        System.out.println("Modulus (Remainder): " + (num1 % num2));

        System.out.println("\n 2. Relational Operations:");
        System.out.println(num1 + " == " + num2 + " : " + (num1 == num2));
        System.out.println(num1 + " != " + num2 + " : " + (num1 != num2));
        System.out.println(num1 + " > " + num2 + " : " + (num1 > num2));
        System.out.println(num1 + " < " + num2 + " : " + (num1 < num2));
        System.out.println(num1 + " >= " + num2 + " : " + (num1 >= num2));
        System.out.println(num1 + " <= " + num2 + " : " + (num1 <= num2));

        System.out.println("\n 3. Logical Operations:");
        boolean condition1 = (num1 > 0);
        boolean condition2 = (num2 > 0);
        System.out.println("num1 > 0 AND num2 > 0 : " + (condition1 && condition2));
        System.out.println("num1 > 0 OR num2 > 0 : " + (condition1 || condition2));
        System.out.println("NOT (num1 > 0) : " + (!condition1));

        sc.close();
    }
}
