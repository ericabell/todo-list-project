const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');

let todos = {
  todos : [
    {name: 'todo 1', completed: true},
    {name: 'todo 2', completed: false},
    {name: 'todo 3', completed: false},
  ]
}

let app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(expressValidator());

app.get('/', (req,res) => {
  res.render('todos', todos);
})

app.listen(3000, () => {
  console.log('Server running on 3000');
})
