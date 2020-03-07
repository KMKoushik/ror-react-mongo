const API_URL = 'http://localhost:3000'

export const getAllNotes = () => {
  return fetch(`${API_URL}/notes`).then(res => res.json());
};

export const addNote = (title, content) => {
  return fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content }),
  }).then(res => res.json());
};


export const deleteNote = noteId => {
  return fetch(`${API_URL}/notes/${noteId}`, {
    method: 'DELETE',
  });
};