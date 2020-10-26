var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /results:
 *   get:
 *     description: Get all competition entry scores
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All requests
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
