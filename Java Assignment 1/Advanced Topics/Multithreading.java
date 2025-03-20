import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 1. Extending Thread class
class MyThread extends Thread {
    public void run() {
        System.out.println(Thread.currentThread().getName() + " is running...");
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
    }
}

// 2️. Implementing Runnable interface
class MyRunnable implements Runnable {
    public void run() {
        System.out.println(Thread.currentThread().getName() + " (Runnable) is executing...");
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            System.out.println("Runnable thread interrupted");
        }
    }
}

// 3️. Shared resource with Synchronization
class BankAccount {
    private int balance = 1000;

    // Synchronized method to prevent race conditions
    public synchronized void withdraw(int amount) {
        if (balance >= amount) {
            System.out.println(Thread.currentThread().getName() + " is withdrawing: " + amount);
            balance -= amount;
            System.out.println("Remaining balance: " + balance);
        } else {
            System.out.println("Insufficient funds for " + Thread.currentThread().getName());
        }
    }
}

// 4️. Inter-thread communication (Producer-Consumer)
class SharedResource {
    private int data;
    private boolean available = false;

    public synchronized void produce(int value) {
        while (available) {
            try {
                wait(); // Wait if data is available
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        data = value;
        available = true;
        System.out.println("Produced: " + data);
        notify(); // Notify consumer
    }

    public synchronized void consume() {
        while (!available) {
            try {
                wait(); // Wait if no data
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("Consumed: " + data);
        available = false;
        notify(); // Notify producer
    }
}

// 5️. ExecutorService for Thread Pooling
class Task implements Runnable {
    private int taskId;

    public Task(int taskId) {
        this.taskId = taskId;
    }

    public void run() {
        System.out.println("Executing Task " + taskId + " on Thread: " + Thread.currentThread().getName());
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

// MAIN CLASS: Running all the threads together
public class Multithreading {
    public static void main(String[] args) {
        System.out.println("🔹 Multithreading Example Started 🔹");

        // 1️⃣ Running threads using Thread class
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();

        // 2️⃣ Running threads using Runnable interface
        Thread r1 = new Thread(new MyRunnable());
        Thread r2 = new Thread(new MyRunnable());
        r1.start();
        r2.start();

        // 3️⃣ Synchronization Example
        BankAccount account = new BankAccount();
        Thread user1 = new Thread(() -> account.withdraw(700), "User1");
        Thread user2 = new Thread(() -> account.withdraw(700), "User2");
        user1.start();
        user2.start();

        // 4️⃣ Inter-thread communication (Producer-Consumer)
        SharedResource resource = new SharedResource();
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                resource.produce(i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                resource.consume();
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        producer.start();
        consumer.start();

        // 5️⃣ Using ExecutorService for Thread Pooling
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int i = 1; i <= 5; i++) {
            executor.execute(new Task(i));
        }
        executor.shutdown(); // Shutdown after tasks finish

        System.out.println("🔹 Multithreading Example Completed 🔹");
    }
}
