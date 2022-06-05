const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/todos/:pageNumber', db.getTodos)
app.get('/todo/:id', db.getTodoById)
app.post('/todos', db.createTodo)
app.put('/todos/:id', db.updateTodo)
app.delete('/todos/:id', db.deleteTodo)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})