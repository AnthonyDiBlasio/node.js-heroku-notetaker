// const require packages/port
const express = require('express');
const uniqid = require('uniqid');
const path = require('path');
const PORT = process.env.PORT || 3001;
const database = require('./db/db.json');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for index html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);
//GET route for notes html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
app.get('/api/notes', (req, res) => res.json(database));
//POST for notes
app.post('/api/notes', (req, res) =>{
  res.json('completed')
  const { title, text } = req.body;
  const newnote = {
    title,
    text,
    id : uniqid(),
  }
  console.log(req.body);
  database.push(newnote);
  fs.writeFile('./db/db.json',JSON.stringify(database), (err) => console.log(err));

} );
// DELETE for notes
app.delete('/api/notes/:id', (req, res) =>{
  console.log(req.params.id)
  let index = database.findIndex(item => item.id === req.params.id);
  database.splice(index, 1);
  res.sendStatus(200);
  fs.writeFile('./db/db.json',JSON.stringify(database), (err) => console.log(err));
} );

// listen for localhost 3001
app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));