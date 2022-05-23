const express = require('express');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
app.get('/api/notes', (req, res) => res.json(db));
app.post('/api/notes', (req, res) =>{
  const { title, text } = req.body;
  const newnote = {
    title,
    text,
    id : uniqid(),
  }
  console.log(req.body);
  db.push(newnote);
  fs.writeFile('./db/db.json',JSON.stringify(db), (err) => console.log(err));

} );
app.delete('/api/notes/:id', (req, res) =>{
  console.log(req.params.id)
  let index = db.findIndex(item => item.id === req.params.id);
  db.splice(index, 1);
  res.sendStatus(200);
  fs.writeFile('./db/db.json',JSON.stringify(db), (err) => console.log(err));
} );


app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));