const swaggerUi = require('swagger-ui-express')

swaggerDocumet = require('../index')

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocumet));
    app.use('../app/controllers/projectController.js',router);