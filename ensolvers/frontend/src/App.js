import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (token) {
      fetch('/notes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setNotes(data));

      fetch('/tags', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setTags(data));
    }
  }, [token]);

  const addNote = () => {
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content }),
    })
    .then(response => response.json())
    .then(note => {
      setNotes([...notes, note]);
      setContent('');
    });
  };

  const addTag = () => {
    fetch('/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: tagName }),
    })
    .then(response => response.json())
    .then(tag => {
      setTags([...tags, tag]);
      setTagName('');
    });
  };

  const filterNotes = (tagId) => {
    fetch(`/notes?tagId=${tagId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setNotes(data));
  };

  const register = () => {
    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
  };

  const login = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      setToken(data.token);
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>
      <h1>Tags</h1>
      <input
        type="text"
        value={tagName}
        onChange={e => setTagName(e.target.value)}
      />
      <button onClick={addTag}>Add Tag</button>
      <h1>Filter Notes</h1>
      <select onChange={e => filterNotes(e.target.value)}>
        <option value="">All</option>
        {tags.map(tag => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <h1>Register</h1>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
