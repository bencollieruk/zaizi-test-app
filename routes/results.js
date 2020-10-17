var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /results:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
