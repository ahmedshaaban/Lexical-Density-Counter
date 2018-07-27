const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config()
mongoose.connect(`mongodb://${process.env.DB_HOST}/vai-task`);

const Word = require('./models/word');
const Admin = require('./models/admin');

const initWordArr = ['do', 'got', 'is',
    'have', 'and', 'although', 'or',
    'that', 'when', 'while', 'a', 'either',
    'more', 'much', 'neither', 'my', 'that',
    'the', 'as', 'no', 'nor', 'not', 'at',
    'between', 'in', 'of', 'without', 'I',
    'you', 'he', 'she', 'it', 'we', 'they',
    'anybody', 'one'];

let promiseArr = [];
for (const word of initWordArr) {
    promiseArr.push(new Word({ text: word }).save());
}

promiseArr.push(new Admin({ email: process.env.ADMIN_EMAIL, password: bcrypt.hashSync(process.env.ADMIN_PW, 10) }).save())

Promise.all(promiseArr).then(() => {
    console.log('Done init DB');
    process.exit();
})
