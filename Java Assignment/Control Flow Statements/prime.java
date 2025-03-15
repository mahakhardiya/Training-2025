import java.util.Scanner;

public class prime {

    public class PrimeCheck {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);

            System.out.print("Enter a number: ");
            int num = sc.nextInt();

            boolean isPrime = true;

            if (num <= 1) {
                isPrime = false; // Numbers <= 1 are not prime
            } else {
                for (int i = 2; i <= Math.sqrt(num); i++) { // Optimized check up to √num
                    if (num % i == 0) {
                        isPrime = false; // If divisible, not prime
                        break;
                    }
                }
            }

            if (isPrime) {
                System.out.println(num + " is a prime number.");
            } else {
                System.out.println(num + " is not a prime number.");
            }

            sc.close();
        }
    }

}
