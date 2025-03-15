import java.io.*;

interface Animal {
    void makeSound();
}

abstract class Bird {
    abstract void fly();

    void eat() {
        System.out.println("Bird is eating...");
    }
}

class Dog implements Animal {
    public void makeSound() {
        System.out.println("Dog barks!");
    }
}

class Sparrow extends Bird {
    void fly() {
        System.out.println("Sparrow is flying...");
    }
}

class ExceptionHandling {
    public static void divideNumbers(int a, int b) {
        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed.");
        }
    }
}

class FileOperations {
    public static void readFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            System.out.println("\nFile Contents:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}

class Task1 extends Thread {
    public void run() {
        System.out.println("Task 1 is running...");
    }
}

class Task2 implements Runnable {
    public void run() {
        System.out.println("Task 2 is running...");
    }
}

public class AdvancedJavaConcepts {
    public static void main(String[] args) {
        // INTERFACES & ABSTRACT CLASSES
        Dog myDog = new Dog();
        myDog.makeSound();

        Sparrow myBird = new Sparrow();
        myBird.fly();
        myBird.eat();

        // EXCEPTION HANDLING
        ExceptionHandling.divideNumbers(10, 0);

        // FILE I/O OPERATIONS
        FileOperations.readFile("sample.txt"); // Ensure a file named 'sample.txt' exists

        // MULTITHREADING
        Task1 t1 = new Task1();
        Task2 t2 = new Task2();
        Thread thread2 = new Thread(t2);

        t1.start();
        thread2.start();
    }
}
