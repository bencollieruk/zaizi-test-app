const express = require('express');
const axios = require('axios');
const router = express.Router();
const serverUrl = process.env.SERVER;


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
    //console.log(latestDefinition);
    const createInstanceEndpoint = serverUrl + "/engine-rest/process-definition/" + latestDefinition + "/start";
    const username = req.query.username;
    const data = {"variables":
            {
                "name": {"value": username}
            }
    };
    console.log(data);
    axios.post(createInstanceEndpoint, data)
        .then(function (response) {
            res.send({"entry_id": response.data.id});
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
 *         name: entry_id
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
router.post('/:id/score', async(req, res, next) => {
    const instanceId = req.params.id;
    const score = parseInt(req.query.score);
    const taskId = await getTaskDefinitionFromInstanceId(instanceId);
    await addScoreToEntry(taskId, score);
    const response = {
        "entry_id": instanceId,
        "score": score
    };
    res.send(response);
});

async function addScoreToEntry(taskId, score) {
    const taskCompletionEndpoint = serverUrl + "/engine-rest/task/" + taskId + "/complete";
    const data = {"variables":
            {
                "score": {"value": score}
            }
    };
    const response = await axios.post(taskCompletionEndpoint, data);
    return {"score": score};
}

async function getTaskDefinitionFromInstanceId(instanceId) {
    const getTaskDefinitionEndpoint = serverUrl + "/engine-rest/task/?processInstanceId=" + instanceId
    const response = await axios.get(getTaskDefinitionEndpoint);
    const data = response.data;
    return data[0].id;
}

async function getLatestDefinition() {
    const getDefinitionEndpoint = serverUrl + "/engine-rest/process-definition/";
    //console.log(getDefinitionEndpoint);
    const response = await axios.get(getDefinitionEndpoint);
    const data = response.data;
    //console.log(data);
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
