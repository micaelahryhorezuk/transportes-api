const express = require('express');
const router = express.Router();
require('dotenv');

router.get('/', function(_req, res, next) {
  return res.status(200).send({
    api: process.env.npm_package_name,
    version: process.env.npm_package_version,
  });
});

module.exports = router;
