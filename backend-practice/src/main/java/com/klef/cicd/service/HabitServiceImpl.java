package com.klef.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.model.Habit;
import com.klef.cicd.repository.HabitRepository;


@Service
public class HabitServiceImpl implements HabitService {

    @Autowired
    private HabitRepository habitRepository;

    @Override
    public Habit addHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    @Override
    public Habit getHabitById(long id) {
        Optional<Habit> opt = habitRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Habit updateHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public void deleteHabitById(long id) {
        habitRepository.deleteById(id);
    }
}
