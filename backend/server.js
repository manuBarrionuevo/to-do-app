const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) console.error(err.message);
  console.log('Conectado a SQLite.');
});

db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, name TEXT)');

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO tasks (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
