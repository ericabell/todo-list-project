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
  console.log(todos);
  res.render('todos', todos);
})

app.post('/todo', (req, res) => {
  console.log(`Add todo ${req.body.todo}`);
  // insert the todo
  // need to find a unique id
  let largest = 1;
  todos.todos.forEach( (todo) => {
    console.log(todo);
    if( todo.id > largest ) {
      largest = todo.id;
    }
  });
  console.log(largest+1);
  todos.todos.push({id: largest+1, name: req.body.todo, completed: false});
  res.redirect('/');
})

app.post('/todo/:id', (req, res) => {
  console.log('post a todo');
  console.log('need to delete: ' + req.body.todo);
  // changed the completed flag
  todos.todos.forEach( (todo) => {
    if( todo.id === Number(req.body.todo) ) {
      todo.completed = true;
    }
  });
  console.dir(todos);

  res.redirect('/');
})

app.listen(3000, () => {
  console.log('Server running on 3000');
})
