package com.example.studentportal.controller;


import com.example.studentportal.entity.Student;
import com.example.studentportal.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    //    ADD STUDENT
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    //    SHOW ALL STUDENT
    @GetMapping
    public List<Student> gteAllStudents() {
        return studentService.getAllStudents();
    }

    //    FIND STUDENT BY ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    //    FIND STUDENT BY NAME
    @GetMapping("/search")
    public List<Student> searchStudentsByName(@RequestParam String name) {
        return studentService.searchStudentByName(name);
    }

    //    UPDATE STUDENT
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
        return studentService.updateStudent(id, updatedStudent);
    }

    //    DELETE STUDENT
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
        return "Student Deleted Successfully";
    }

}