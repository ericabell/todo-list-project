const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');

let todos = {
  todos : [
    {id: 1, name: 'todo 1', completed: false},
    {id: 2, name: 'todo 2', completed: false},
    {id: 3, name: 'todo 3', completed: true}
  ]
}

let app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(expressValidator());

app.all('/', (req,res,next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req,res) => {
  res.render('todos', todos);
})

app.post('/todo', (req, res) => {
  console.log(`Add todo ${req.body.todo}`);
  // insert the todo
  todos.todos.push({id: 3, name: req.body.todo, completed: false});
  res.render('todos', todos);
})

app.post('/todo/:id', (req, res) => {
  console.log('post a todo');
  console.log('need to delete: ' + req.body.todo);

  res.send('success');
})

app.listen(3000, () => {
  console.log('Server running on 3000');
})
