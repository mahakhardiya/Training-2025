import java.util.Scanner;

public class evenOrOdd {

    public static void isEvenOrOdd(int n) {
        if (n % 2 == 0) {
            System.out.println(n + " is Even");
        } else {
            System.out.println(n + " is Odd");
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        isEvenOrOdd(n);

        sc.close();
    }
}
