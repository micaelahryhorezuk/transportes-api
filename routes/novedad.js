const express = require('express');
const router = express.Router();
const novedadModel = require('../src/novedadModel');

router.get('/', async function (_req, res, _next) {
  return novedadModel.findAll()
    .then(r => res.status(200).send(r))
    .catch(e => res.status(500).send({mesage: e}))
});

router.get('/:id', async function (req, res, _next) {
  return novedadModel.findOne(req.params.id)
    .then(r => res.status(200).send(r))
    .catch(e => res.status(500).send({mesage: e}))
});

router.post('/', async function (req, res, _next) {
  if (!req.session?.store?.isAdmin) return res.status(401).send({message: 'Unauthorized'});
  return novedadModel.insertOne(req.body)
    .then(_r => res.status(204).send())
    .catch(e => res.status(500).send({mesage: e}))
});

router.delete('/:id', async function (req, res, _next) {
  if (!req.session?.store?.isAdmin) return res.status(401).send({message: 'Unauthorized'});
  return novedadModel.deleteOne(req.params.id)
    .then(_r => res.status(204).send())
    .catch(e => res.status(500).send({mesage: e}))
});

router.post('/delete-many', async function (req, res, _next) {
  if (!req.session?.store?.isAdmin) return res.status(401).send({message: 'Unauthorized'});
  return novedadModel.deleteMany(req.body)
    .then(_r => res.status(204).send())
    .catch(e => res.status(500).send({mesage: e}))
});

router.post('/insert-many', async function (req, res, _next) {
  if (!req.session?.store?.isAdmin) return res.status(401).send({message: 'Unauthorized'});
  return novedadModel.insertMany(req.body)
    .then(_r => res.status(204).send())
    .catch(e => res.status(500).send({mesage: e}))
});

router.put('/:id', async function (req, res, _next) {
  if (!req.session?.store?.isAdmin) return res.status(401).send({message: 'Unauthorized'});
  return novedadModel.updateOne(req.params.id, req.body)
    .then(_r => res.status(204).send())
    .catch(e => res.status(500).send({mesage: e}))
});

module.exports = router;