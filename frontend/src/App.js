import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [groups, setGroups] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get("http://localhost:5000/groups");
    setGroups(res.data);
  };

  const createGroup = async () => {
    if (!subject || !description || !createdBy) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/groups", {
      subject,
      description,
      createdBy,
    });

    setSubject("");
    setDescription("");
    setCreatedBy("");
    fetchGroups();
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Online Study Group Finder</h1>
        <p>Find, Create & Collaborate with Students</p>
      </header>

      <div className="form-section">
        <h2>Create Study Group</h2>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Your Name"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />

        <button onClick={createGroup}>Create Group</button>
      </div>

      <div className="groups-section">
        <h2>Available Groups</h2>

        <div className="group-grid">
          {groups.map((g) => (
            <div key={g.id} className="card">
              <h3>{g.subject}</h3>
              <p>{g.description}</p>
              <span>Created by {g.createdBy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;