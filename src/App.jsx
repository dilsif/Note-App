
import { useState } from 'react';
import './App.css';

function App() {
  const [note, setNote] = useState("");
  const [color, setColor] = useState("bg-yellow-200");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function addNote() {
    if (note.trim() === "") return;

    if (editIndex !== null) {
      setNotes(notes.map((item, index) => {
        if (index === editIndex) {
          return { ...item, text: note };
        }
        return item;
      }));

      setEditIndex(null);
    } else {
      setNotes([...notes, { text: note, color: color }]);
    }

    setNote("");
  }

  function editNote(index) {
    setNote(notes[index].text);
    setColor(notes[index].color);
    setEditIndex(index);
  }

  function deleteNote(index) {
    setNotes(notes.filter((item, i) => i !== index));

    if (editIndex === index) {
      setNote("");
      setEditIndex(null);
    } else if (editIndex !== null && editIndex > index) {
      setEditIndex(editIndex - 1);
    }
  }

  return (
    <div className="container">
      <h1 className="heading">Note Pad</h1>

      <textarea
        placeholder="Write your note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="colors">
        <button onClick={() => setColor("bg-yellow-200")}>🟡</button>
        <button onClick={() => setColor("bg-pink-200")}>🩷</button>
        <button onClick={() => setColor("bg-green-200")}>🟢</button>
        <button onClick={() => setColor("bg-blue-200")}>🔵</button>
      </div>

      <button className="add-btn" onClick={addNote}>
        {editIndex !== null ? "Update Note" : "Add Note"}
      </button>

      {editIndex !== null && (
        <button onClick={() => {
          setNote("");
          setEditIndex(null);
        }}>
          Cancel Edit
        </button>
      )}

      <div className="notes-list">
        {notes.map((item, index) => (
          <div
            className={`note-card ${item.color}`}
            key={index}
          >
            <p>{item.text}</p>

            <button onClick={() => editNote(index)}>
              Edit
            </button>

            <button onClick={() => deleteNote(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
