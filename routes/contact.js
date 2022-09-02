const express = require('express');
const router = express.Router();
const contactModel = require('../src/contactModel');

router.post('/', function(req, res, _next) {
  return contactModel.sendEmail(req.body)
    .then(_r => res.status(204).send())
    .catch(e => res.status(500).send({message: 'Error al enviar email', error: e}))
});

module.exports = router;