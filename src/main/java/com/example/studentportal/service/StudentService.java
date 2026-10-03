package com.example.studentportal.service;

import com.example.studentportal.entity.Student;
import com.example.studentportal.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    //    ADD STUDENT
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    //    SHOW ALL STUDENTS
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    //    FIND STUDENT BY ID
    public Student getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    //    FIND STUDENT BY NAME
    public List<Student> searchStudentByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }


    //    UPDATE STUDENT
    public Student updateStudent(int id, Student updatedStudent) {

        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent != null) {

            existingStudent.setName(updatedStudent.getName());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setMobile(updatedStudent.getMobile());
            existingStudent.setCourse(updatedStudent.getCourse());
            existingStudent.setCity(updatedStudent.getCity());

            return studentRepository.save(existingStudent);

        }
        return null;
    }

    //    DELETE STUDENT
    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }


}
