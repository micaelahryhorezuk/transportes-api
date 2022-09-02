const express = require('express');
const router = express.Router();

router.get('/', function(req, res, _next) {
	req.session.destroy();
  return res.status(204).send();
});

module.exports = router;
