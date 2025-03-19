package com.hrportal.service;

import com.hrportal.model.Employee;
import com.hrportal.repository.EmployeeRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmployeeService {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    // ✅ Add Employee
    public Employee addEmployee(Employee employee) {
        logger.info("Adding employee: {}", employee);
        return repository.save(employee);
    }

    // ✅ Fetch All Employees
    public List<Employee> getAllEmployees() {
        List<Employee> employees = repository.findAll();
        logger.info("Fetching all employees: {}", employees.size());
        return employees;
    }

    // ✅ Find Employee By ID
    public Optional<Employee> findById(Long id) {
        return repository.findById(id);
    }

    // ✅ Update Employee (ID remains unchanged)
    public ResponseEntity<Employee> updateEmployee(Long id, Employee updatedEmployee) {
        Optional<Employee> existingEmployeeOptional = repository.findById(id);
        if (existingEmployeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Employee existingEmployee = existingEmployeeOptional.get();
        updatedEmployee.setId(existingEmployee.getId()); // Keep the same ID
        repository.save(updatedEmployee);

        return ResponseEntity.ok(updatedEmployee);
    }

    // ✅ Delete Employee
    public void deleteEmployee(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            logger.info("Deleted Employee with ID: {}", id);
        } else {
            logger.warn("Employee ID not found: {}", id);
            throw new RuntimeException("Employee not found");
        }
    }
}
