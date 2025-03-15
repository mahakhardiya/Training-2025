class Student {
    protected String name;
    protected int rollNumber;
    protected double marks;

    public Student(String name, int rollNumber, double marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }

    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
    }
}

class GraduateStudent extends Student {
    private String thesisTitle;

    public GraduateStudent(String name, int rollNumber, double marks, String thesisTitle) {
        super(name, rollNumber, marks);
        this.thesisTitle = thesisTitle;
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Thesis Title: " + thesisTitle);
    }
}

class PolymorphismDemo {
    public String calculateGrade(double marks) {
        if (marks >= 90)
            return "A";
        else if (marks >= 75)
            return "B";
        else if (marks >= 60)
            return "C";
        else
            return "D";
    }

    public String calculateGrade(double marks, boolean hasResearch) {
        if (marks >= 85 && hasResearch)
            return "A+";
        else
            return calculateGrade(marks);
    }
}

class EncapsulationDemo {
    private String courseName;

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}

public class OOP {
    public static void main(String[] args) {
        // Creating Student object
        Student student = new Student("Mahak", 101, 85.5);
        System.out.println("Student Details:");
        student.displayDetails();

        System.out.println("\nGraduate Student Details:");
        // Creating GraduateStudent object
        GraduateStudent gradStudent = new GraduateStudent("Kritika", 102, 92, "AI Research");
        gradStudent.displayDetails();

        // Polymorphism
        PolymorphismDemo poly = new PolymorphismDemo();
        System.out.println("\nStudent Grade: " + poly.calculateGrade(85));
        System.out.println("Graduate Student Grade (with research): " + poly.calculateGrade(85, true));

        // Encapsulation
        EncapsulationDemo course = new EncapsulationDemo();
        course.setCourseName("Data Science");
        System.out.println("\nEncapsulated Course Name: " + course.getCourseName());
    }
}
