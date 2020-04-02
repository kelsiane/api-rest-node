const express = require('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
require('./app/controllers/index')(app);








const PORT = 8187;
app.listen(PORT, function(){

    console.log("APIREST rodando na Porta:"+PORT);

})



