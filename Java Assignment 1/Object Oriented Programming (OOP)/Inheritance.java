// Parent class: Student
class Student {
    private String name;
    private int studentId;

    // Constructor
    public Student(String name, int studentId) {
        this.name = name;
        this.studentId = studentId;
    }

    // Getter methods
    public String getName() {
        return name;
    }

    public int getStudentId() {
        return studentId;
    }

    // Display student details
    public void displayInfo() {
        System.out.println("Student Name: " + name);
        System.out.println("Student ID: " + studentId);
    }
}

// Child class: GraduateStudent (inherits from Student)
class GraduateStudent extends Student {
    private String researchTopic;
    private String advisorName;

    // Constructor (using super to call parent constructor)
    public GraduateStudent(String name, int studentId, String researchTopic, String advisorName) {
        super(name, studentId); // Calls parent class constructor
        this.researchTopic = researchTopic;
        this.advisorName = advisorName;
    }

    // Additional method for GraduateStudent
    public void displayResearchDetails() {
        displayInfo(); // Calling parent method
        System.out.println("Research Topic: " + researchTopic);
        System.out.println("Advisor: " + advisorName);
    }
}

// Main class to demonstrate inheritance
public class Inheritance {
    public static void main(String[] args) {
        // Creating a GraduateStudent object
        GraduateStudent gradStudent = new GraduateStudent("Alice Johnson", 1001, "Artificial Intelligence",
                "Dr. Smith");

        // Displaying details
        gradStudent.displayResearchDetails();
    }
}
