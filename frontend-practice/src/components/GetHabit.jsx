import React, { useState } from "react";
import axios from "axios";

const GetHabit = () => {
  const [id, setId] = useState("");
  const [habit, setHabit] = useState(null);
  const baseUrl = `${import.meta.env.VITE_API_URL}/habitapi`;

  const fetchHabit = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${id}`);
      setHabit(res.data);
    } catch (error) {
      setHabit(null);
      alert("Habit not found");
    }
  };

  return (
    <div className="habit-container">
      <h2>Get Habit By ID</h2>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter Habit ID" />
      <button className="btn-blue" onClick={fetchHabit}>Fetch</button>

      {habit && (
        <div>
          <h3>Habit Details:</h3>
          <pre>{JSON.stringify(habit, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetHabit;
