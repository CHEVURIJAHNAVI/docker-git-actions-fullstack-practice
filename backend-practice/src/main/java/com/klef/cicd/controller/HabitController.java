package com.klef.cicd.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.cicd.model.Habit;
import com.klef.cicd.service.HabitService;


@RestController
@RequestMapping("/habitapi")
@CrossOrigin(origins = "*")
public class HabitController {

    @Autowired
    private HabitService habitService;

    @GetMapping("/")
    public String home() {
        return "Habit Tracker Backend is running";
    }

    @GetMapping("/docker")
    public String docker() {
        return "Docker Full Stack Deployment Demo with Git Actions for Habit Tracker";
    }

    // Add Habit
    @PostMapping("/add")
    public ResponseEntity<Habit> addHabit(@RequestBody Habit habit) {
        Habit savedHabit = habitService.addHabit(habit);
        return new ResponseEntity<>(savedHabit, HttpStatus.CREATED);
    }

    // Get All Habits
    @GetMapping("/all")
    public ResponseEntity<List<Habit>> getAllHabits() {
        List<Habit> habits = habitService.getAllHabits();
        return new ResponseEntity<>(habits, HttpStatus.OK);
    }

    // Get Habit by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getHabitById(@PathVariable long id) {
        Habit habit = habitService.getHabitById(id);
        if (habit != null) {
            return new ResponseEntity<>(habit, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Habit with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Update Habit
    @PutMapping("/update")
    public ResponseEntity<?> updateHabit(@RequestBody Habit habit) {
        Habit existing = habitService.getHabitById(habit.getId());
        if (existing != null) {
            Habit updatedHabit = habitService.updateHabit(habit);
            return new ResponseEntity<>(updatedHabit, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Habit with ID " + habit.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete Habit
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHabit(@PathVariable long id) {
        Habit existing = habitService.getHabitById(id);
        if (existing != null) {
            habitService.deleteHabitById(id);
            return new ResponseEntity<>("Habit with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Habit with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}

