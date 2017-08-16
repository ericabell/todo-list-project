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

app.get('/todo', (req,res) => {
  res.render('todos', todos);
})

app.post('/todo', (req, res) => {
  console.log(`Add todo ${req.body.todo}`);
  // insert the todo
  // need to find a unique id
  let largest = 1;
  todos.todos.forEach( (todo) => {
    if( todo.id > largest ) {
      largest = todo.id;
    }
  });
  todos.todos.push({id: largest+1, name: req.body.todo, completed: false});
  res.redirect('/todo');
})

app.post('/todo/:id', (req, res) => {
  console.log('need to update todo: ' + req.params.id);
  // changed the completed flag
  todos.todos.forEach( (todo) => {
    if( todo.id === Number(req.params.id) ) {
      todo.completed = true;
    }
  });

  res.redirect('/todo');
})

app.listen(3000, () => {
  console.log('Server running on 3000');
})
