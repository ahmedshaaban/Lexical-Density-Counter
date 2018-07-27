const mongoose = require('mongoose');

const Word = mongoose.model('Word', { text: String });

module.exports = Word;

