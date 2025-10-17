package com.klef.cicd.service;


import java.util.List;

import com.klef.cicd.model.Habit;


public interface HabitService {
    Habit addHabit(Habit habit);
    List<Habit> getAllHabits();
    Habit getHabitById(long id);
    Habit updateHabit(Habit habit);
    void deleteHabitById(long id);
}

