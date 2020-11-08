var express = require('express');
var router = express.Router();
const axios = require('axios');
const serverUrl = process.env.SERVER;

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
router.get('/', async(req, res, next) => {
  const variables = await getAllVariables();
  const data = variables.data;
  scores = {}
  for (let index in data) {
    console.log(data[index])
    if (data[index].name === "score") {
      const id = data[index].processInstanceId;
      scores[id] = scores[id] || {};
      scores[id].score = data[index].value;
    } else if (data[index].name === "name") {
      const id = data[index].processInstanceId;
      scores[id] = scores[id] || {};
      scores[id].username = data[index].value;
    }
  }
  res.send(scores);
});

async function getAllVariables() {
  const variableEndpoint = serverUrl + "/engine-rest/history/variable-instance";
  return await axios.get(variableEndpoint);
}

module.exports = router;
