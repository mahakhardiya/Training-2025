public class sum {
    public static void main(String[] args) {
        int sum = 0;
        int i = 2;

        while (i <= 10) {
            sum += i;
            i += 2;
        }
        System.out.println("Sum of even numbers from 1 to 10 is: " + sum);
    }
}
