const express = require('express');
const router = express.Router();
const userModel = require('../src/userModel');

router.post('/', async function(req, res, next) {
  return userModel.login(req.body.username, req.body.password)
    .then(user => {
      req.session.store = {
        loggedIn: Boolean(user),
        isAdmin: Boolean(user?.admin),
        user: user,
      }
      return res.status(200).send(req.session.store);
    })
    .catch(e => {
      return res.status(404).send({message: 'Usuario o contraseña incorrectos'});
    })
});

module.exports = router;
