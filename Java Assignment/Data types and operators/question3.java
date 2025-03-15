import java.util.Scanner;

public class question3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Temperature Converter");
        System.out.println("1. Celsius to Fahrenheit");
        System.out.println("2. Fahrenheit to Celsius");
        System.out.print("Choose an option (1 or 2): ");
        int choice = sc.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter temperature in Celsius: ");
                double celsius = sc.nextDouble();
                double fahrenheit = (celsius * 9 / 5) + 32;
                System.out.println("Temperature in Fahrenheit: " + fahrenheit + "°F");
                break;

            case 2:
                System.out.print("Enter temperature in Fahrenheit: ");
                double fahr = sc.nextDouble();
                double cels = (fahr - 32) * 5 / 9;
                System.out.println("Temperature in Celsius: " + cels + "°C");
                break;

            default:
                System.out.println("Invalid choice! Please enter 1 or 2.");
        }

        sc.close();
    }
}
