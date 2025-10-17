import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewHabits = ({ setHabitToEdit }) => {
  const [habits, setHabits] = useState([]);
  const baseUrl = `${import.meta.env.VITE_API_URL}/habitapi`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllHabits();
  }, []);

  const fetchAllHabits = async () => {
    const res = await axios.get(`${baseUrl}/all`);
    setHabits(res.data);
  };

  const deleteHabit = async (id) => {
    await axios.delete(`${baseUrl}/delete/${id}`);
    fetchAllHabits();
  };

  const editHabit = (habit) => {
    setHabitToEdit(habit);
    navigate("/add"); // Navigate to AddHabit page
  };

  return (
    <div className="habit-container">
      <h2>All Habits</h2>
      {habits.length === 0 ? <p>No habits found.</p> : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Frequency</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.user_id}</td>
                  <td>{h.title}</td>
                  <td>{h.description}</td>
                  <td>{h.frequency}</td>
                  <td>{h.created_at}</td>
                  <td>
                    <button className="btn-green" onClick={() => editHabit(h)}>Edit</button>
                    <button className="btn-red" onClick={() => deleteHabit(h.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewHabits;
