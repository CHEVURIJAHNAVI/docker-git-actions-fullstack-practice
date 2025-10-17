import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const AddHabit = () => {
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState({
    id: '',
    userId: '',
    title: '',
    description: '',
    frequency: '',
    isGood: false
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedHabit, setFetchedHabit] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL; // e.g., http://localhost:2010/habitapi

  useEffect(() => {
    fetchAllHabits();
  }, []);

  const fetchAllHabits = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setHabits(res.data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch habits.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHabit({
      ...habit,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    for (let key in habit) {
      if (key !== 'isGood' && (!habit[key] || habit[key].toString().trim() === '')) {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addHabit = async () => {
    if (!validateForm()) return;

    const payload = {
      id: Number(habit.id),
      userId: Number(habit.userId),
      title: habit.title,
      description: habit.description,
      frequency: habit.frequency,
      isGood: habit.isGood
    };

    try {
      const res = await axios.post(`${baseUrl}/add`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage(`Habit added successfully! ID: ${res.data.id}`);
      fetchAllHabits();
      resetForm();
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage('Error adding habit.');
    }
  };

  const updateHabit = async () => {
    if (!validateForm()) return;

    const payload = {
      id: Number(habit.id),
      userId: Number(habit.userId),
      title: habit.title,
      description: habit.description,
      frequency: habit.frequency,
      isGood: habit.isGood
    };

    try {
      const res = await axios.put(`${baseUrl}/update`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage(`Habit updated successfully! ID: ${res.data.id}`);
      fetchAllHabits();
      resetForm();
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage('Error updating habit.');
    }
  };

  const deleteHabit = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllHabits();
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage('Error deleting habit.');
    }
  };

  const getHabitById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedHabit(res.data);
      setMessage('');
    } catch (error) {
      setFetchedHabit(null);
      setMessage('Habit not found.');
    }
  };

  const handleEdit = (h) => {
    setHabit({
      id: h.id,
      userId: h.userId,
      title: h.title,
      description: h.description,
      frequency: h.frequency,
      isGood: h.isGood
    });
    setEditMode(true);
    setMessage(`Editing habit with ID ${h.id}`);
  };

  const resetForm = () => {
    setHabit({
      id: '',
      userId: '',
      title: '',
      description: '',
      frequency: '',
      isGood: false
    });
    setEditMode(false);
  };

  return (
    <div className="habit-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Habit Management</h2>

      {/* Add / Edit Form */}
      <div>
        <h3>{editMode ? 'Edit Habit' : 'Add Habit'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={habit.id} onChange={handleChange} disabled={editMode} />
          <input type="number" name="userId" placeholder="User ID" value={habit.userId} onChange={handleChange} />
          <input type="text" name="title" placeholder="Title" value={habit.title} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={habit.description} onChange={handleChange} />
          <select name="frequency" value={habit.frequency} onChange={handleChange}>
            <option value="">Select Frequency</option>
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="CUSTOM">CUSTOM</option>
          </select>
          <label>
            <input type="checkbox" name="isGood" checked={habit.isGood} onChange={handleChange} />
            Is this a good habit?
          </label>
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addHabit}>Add Habit</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateHabit}>Update Habit</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Get Habit By ID */}
      <div>
        <h3>Get Habit By ID</h3>
        <input type="number" value={idToFetch} onChange={(e) => setIdToFetch(e.target.value)} placeholder="Enter ID" />
        <button className="btn-blue" onClick={getHabitById}>Fetch</button>

        {fetchedHabit && (
          <div>
            <h4>Habit Found:</h4>
            <pre>{JSON.stringify(fetchedHabit, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Habits Table */}
      <div>
        <h3>All Habits</h3>
        {habits.length === 0 ? (
          <p>No habits found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Frequency</th>
                  <th>Is Good?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((h) => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.userId}</td>
                    <td>{h.title}</td>
                    <td>{h.description}</td>
                    <td>{h.frequency}</td>
                    <td>{h.isGood ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(h)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteHabit(h.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHabit;
