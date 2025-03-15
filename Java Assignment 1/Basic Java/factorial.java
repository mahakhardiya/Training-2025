import java.util.Scanner;

public class factorial {

    public static int fact(int n) {
        int f = 1;

        for (int i = 1; i <= n; i++) {
            f = f * i;
        }

        return f;

    }

    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Enter the number: ");
            int n = sc.nextInt();

            System.out.print("The factorial of the number is: ");
            System.out.println(fact(n));
        }
    }
}
