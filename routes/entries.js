const express = require('express');
const axios = require('axios');
const router = express.Router();

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

    const serverUrl = "https://zaizi-backend.herokuapp.com";
    const processDefinition = "zaizi-challenge:12:fd2d3204-20e1-11eb-b046-fabf85c79aab";
    const createInstanceEndpoint = serverUrl + "/engine-rest/process-definition/" + processDefinition + "/start";
    console.log(createInstanceEndpoint);

    axios.post(createInstanceEndpoint, {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
        .then(function (response) {
            res.send(response.toString());
        })
        .catch(function (error) {
            console.log(error);
            res.send("Error");
        });
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
