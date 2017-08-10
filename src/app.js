const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const words = readWords();
const index = Math.floor(Math.random() * words.length);
const word = words[index];
console.log(word);

// TODO: your code to handle requests

const guesses = {};

server/post('/guess', (req, res) => {
  const letter = req.body.letter;
  // in json body letter must be in double quotes in order to be valid
  console.log(letter);
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a guess' });
    return;
  } else if (letter.length !== 1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a singular letter guess' });
  } else if (guesses[letter]) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `Cannot guess ${letter} again` });
    return;
  }
  guesses.[letter] = true;
});

server.get('/', (req, res) => {
  const wordSoFarArray = Array.fom(word).map((letter) => {
    if(guesses[letter]) {
      return letter;
    }
    return '-';
  });
  const wordSoFar = wordSoFarArray.join('');
  res.send({ wordSoFar, guesses });
});


server.listen(3000);
