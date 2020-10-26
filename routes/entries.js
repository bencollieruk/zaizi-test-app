var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /entries:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for competition entry.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Response containing entry id.
 */
router.post('/', function(req, res, next) {
    const response = {
        "id": "912834"
    }
    res.send(response);
});

/**
 * @swagger
 *
 * /entries/{id}/score:
 *   post:
 *     description: Associate a score with a competition entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: integer
 *         minimum: 1
 *         description: The competition entry ID
 *       - in: query
 *         name: score
 *         description: Score to attach to the competition entry.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/:id/score', function(req, res, next) {
    const response = {
        "id": req.params.id,
        "score": parseInt(req.query.score)
    };
    res.send(response);
});

module.exports = router;
