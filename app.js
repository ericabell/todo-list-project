const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');

let app = express();

app.get('/', (req,res) => {
  res.send('hello');
})

app.listen(3000, () => {
  console.log('Server running on 3000');
})
