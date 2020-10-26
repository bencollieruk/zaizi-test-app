var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /instructions:
 *   get:
 *     description: Get instructions for the test
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: instructions
 */
const response = '{"instructions": "Hit the entries endpoint with a new entry, then add a score using the judge endpoint. Collect the score from the results endpoint. Put the code in a git repo and send us the URL."}';

router.get('/', function(req, res, next) {
    res.send(response);
});

module.exports = router;
