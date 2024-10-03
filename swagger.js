const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: "API Documentation",
        description: "API Documentation for CSE/week3-week4"
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}

const outputFile = "./swagger.json"
const routes = ["./routes/index"]

swaggerAutogen(outputFile, routes, doc)