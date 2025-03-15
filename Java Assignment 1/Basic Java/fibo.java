import java.util.Scanner;

public class fibo {
    public static int fibonacci(int n) {
        if (n == 1 || n == 0) {
            return n;
        }
        int fib = fibonacci(n - 1) + fibonacci(n - 2);
        return fib;
    }

    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Enter the number: ");
            int n = sc.nextInt();

            System.out.print("Fibonacci series up to " + n + " terms: ");
            for (int i = 0; i < n; i++) {
                System.out.print(fibonacci(i) + " ");
            }
        }
    }
}
