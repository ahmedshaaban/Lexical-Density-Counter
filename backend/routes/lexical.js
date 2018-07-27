const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jwt-express');

mongoose.connect(`mongodb://${process.env.DB_HOST}/vai-task`);

const Word = require('../models/word');

const checkLexical = async (wordArr) => {

  let nonLexicalWords = await Word.find();
  nonLexicalWords = nonLexicalWords.map(e => e.text.toLowerCase());
  let counterNonLexical = 0;

  for (let testWord of wordArr) {
    if (nonLexicalWords.includes(testWord))
      counterNonLexical++
  }
  const lexicalCount = wordArr.length - counterNonLexical;
  const lexicalDensity = lexicalCount / wordArr.length;

  return lexicalDensity;
}

/* POST /complexity */
router.post('/', async function (req, res, next) {

  const wordArray = req.body.text.toLowerCase().replace(/\./g, '').split(' ');
  if (wordArray.length > 100 || req.body.text.length > 1000) {
    return res.status(400).send({ error: 'Only texts with up to 100 words or up to 1000 characters are valid input.' })
  }

  const lexicalDensity = await checkLexical(wordArray);

  if (req.query.mode == 'verbose') {
    let sentence_ld = [];
    const setanceArry = req.body.text.toLowerCase().split('.')
    for (let setance of setanceArry) {
      if (setance !== '')
        sentence_ld.push(await checkLexical(setance.replace(/^ +/gm, '')));
    }
    return res.send({ data: { sentence_ld, overall_ld: lexicalDensity } })
  }

  res.send({ data: { overall_ld: lexicalDensity } })
});

/* POST /complexity/add */
router.post('/add', jwt.valid(), async function (req, res, next) {
  const newWord = req.body.word;
  const savedWord = await new Word({ text: newWord }).save()
  return res.send({ msg: `*${savedWord.text}* saved` })
});

module.exports = router;
