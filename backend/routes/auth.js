const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}/vai-task`);

const Admin = require('../models/admin');

/* GET home page. */
router.post('/login', function (req, res, next) {
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (bcrypt.compareSync(req.body.password, admin.password)) {
      const jwt = res.jwt({
        email: admin.email,
        id: admin.id
      });
      res.send(jwt.token);
    } else {
      res.status(401).send({ error: 'Invalid Credentials' })
    }
  }).catch(err =>
    next(err)
  )
});

module.exports = router;
