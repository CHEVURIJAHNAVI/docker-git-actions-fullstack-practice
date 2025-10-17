package com.klef.cicd.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.cicd.model.Habit;


public interface HabitRepository extends JpaRepository<Habit, Long> {
}
