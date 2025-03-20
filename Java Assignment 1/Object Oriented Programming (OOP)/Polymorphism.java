// Parent class demonstrating method overloading
class Animal {
    // Method with no parameters
    void makeSound() {
        System.out.println("Some generic animal sound...");
    }

    // Overloaded method with one parameter
    void makeSound(String sound) {
        System.out.println("Animal makes a sound: " + sound);
    }
}

// Child class demonstrating method overriding
class Dog extends Animal {
    // Overriding the makeSound method
    @Override
    void makeSound() {
        System.out.println("Dog barks: Woof Woof!");
    }
}

// Main class to test polymorphism
public class Polymorphism {
    public static void main(String[] args) {
        // Method Overloading (Compile-time Polymorphism)
        Animal myAnimal = new Animal();
        myAnimal.makeSound(); // Calls method with no parameters
        myAnimal.makeSound("Roar"); // Calls overloaded method with parameter

        // Method Overriding (Runtime Polymorphism)
        Animal myDog = new Dog(); // Parent reference, child object
        myDog.makeSound(); // Calls overridden method in Dog class
    }
}
