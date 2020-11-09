const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");
const baseUrl = process.env.BASE_URL;

var express = require('express');
var router = express.Router();

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Zaizi Tech Task API",
            version: "0.1.0",
            description:
                "An API to access the Zaizi Tech Task for hiring programmers.",
            contact: {
                name: "Zaizi",
                url: "https://www.zaizi.com",
                email: "bcollier@zaizi.com"
            }
        },
        servers: [
            {
                url: baseUrl
            }
        ]
    },
    apis: ["./app.js", "./routes/instructions.js", "./routes/entries.js", "./routes/results.js"]
};

const specs = swaggerJsondoc(options);
router.use("/", swaggerUi.serve);

router.get(
    "/",
    swaggerUi.setup(specs, {
        explorer: true
    })
);


module.exports = router;