const express = require('express');
const axios = require('axios');
const router = express.Router();

const serverUrl = process.env.SERVER;
const processDefinition = process.env.LIVE_PROCESS_ID;
const definitionName = process.env.DEFINITION_NAME;

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
router.post('/', async(req, res, next) => {

    const latestDefinition = await getLatestDefinition();
    console.log(latestDefinition);
    const createInstanceEndpoint = serverUrl + "/engine-rest/process-definition/" + latestDefinition + "/start";
    const data = {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
    axios.post(createInstanceEndpoint, data)
        .then(function (response) {
            res.send(response.data);
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

async function getLatestDefinition() {
    const getDefinitionEndpoint = serverUrl + "/engine-rest/process-definition/";
    console.log(getDefinitionEndpoint);
    const response = await axios.get(getDefinitionEndpoint);
    const data = response.data;
    console.log(data);
    return getLatestDefinitionFromList(data);
}

function getLatestDefinitionFromList(data) {
    let topDefinitionId = 0;
    for (let definition in data) {
        if (data[definition].version > topDefinitionId) {
            topDefinitionId = data[definition].version;
        }
    }
    for (let definition in data) {
        if (data[definition].version === topDefinitionId) {
            return data[definition].id;
        }
    }
    return null;
}


module.exports = router;
