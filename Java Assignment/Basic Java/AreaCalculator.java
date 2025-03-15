import java.util.Scanner;

public class AreaCalculator {

    public static double areaOfCircle(double r) {
        double pi = 3.14;
        return pi * r * r;
    }

    public static double areaOfTriangle(double b, double h) {
        return 0.5 * b * h;
    }

    public static double areaOfRectangle(double l, double b) { // Fixed method name
        return l * b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Click 1 to calculate the area of a circle, 2 for a triangle, and 3 for a rectangle:");
        int x = sc.nextInt();

        switch (x) {
            case 1:
                System.out.print("Enter the radius of the circle: ");
                double r = sc.nextDouble();
                System.out.println("The area of the circle is: " + areaOfCircle(r));
                break;
            case 2:
                System.out.print("Enter the base of the triangle: ");
                double base = sc.nextDouble();
                System.out.print("Enter the height of the triangle: ");
                double height = sc.nextDouble();
                System.out.println("The area of the triangle is: " + areaOfTriangle(base, height));
                break;
            case 3:
                System.out.print("Enter the length of the rectangle: ");
                double length = sc.nextDouble();
                System.out.print("Enter the breadth of the rectangle: ");
                double breadth = sc.nextDouble();
                System.out.println("The area of the rectangle is: " + areaOfRectangle(length, breadth));
                break;
            default:
                System.out.println("Invalid choice! Please enter 1, 2, or 3.");
        }

        sc.close();
    }
}
