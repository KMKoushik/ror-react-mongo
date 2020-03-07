import React, { useState, useEffect } from 'react';
import { getAllNotes, addNote, deleteNote } from '../../service/APIService';
import './MainPage.css';


const NotesForm = (props) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNote(title, content)
      .then(props.handleNoteAdded)
      .catch(e => setError('Error occurred while adding note'));
  };

  return (
    <div>
      <form style={{ display: 'inline-grid' }} onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" className="input" onChange={e => setTitle(e.target.value)} value={title} />
        <textarea type="text" placeholder="Content" className="input" onChange={e => setContent(e.target.value)} value={content} />
        <input type="Submit" value="Add Notes" className="input" />
        <p className="error">
          {error}
        </p>
      </form>
    </div>
  )
};

const NotesCard = (props) => {
  const { title, content, id } = props;

  const handleDelete = () => {
    deleteNote(id).then(props.onDelete);
  };

  return (
    <div className="card">
      <span><b>{title}</b></span>
      <p>{content}</p>

      <button onClick={handleDelete} className="card-button">Delete</button>
    </div>
  )
}

function MainPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => getNotes(), []);

  const getNotes = () => getAllNotes().then(setNotes);

  return (
    <div className="main-page">
      <div className="main-page-header">
        <h1>RoR-React-Mongo</h1>
      </div>
      <div className="main-page-body">
        <NotesForm handleNoteAdded={getNotes}/>
        <div className="card-container">
          {
            notes.map(notesObj => <NotesCard
              content={notesObj.content}
              title={notesObj.title}
              id={notesObj.id}
              onDelete={getNotes}
            />)
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;
