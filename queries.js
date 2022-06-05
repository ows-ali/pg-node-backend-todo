const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: '123',
  port: 5432,
})


const getTodos = (request, response) => {
  toShow = 10
  const offset = request.params.pageNumber ? request.params.pageNumber*toShow - toShow :0

  pool.query('SELECT count(*) FROM todos ', (error, results) => {
      if (error) {
        throw error
      }
      const count = results.rows[0].count
      pool.query('SELECT * FROM todos ORDER BY id ASC limit $1 offset $2 ',[toShow, offset], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({data:results.rows,count})
      })
    })
  }

  const getTodoById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const updateTodo = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description } = request.body

    //if status is sent means it is status-only call, otherwise data is also updating
    if (request.body.status !== null && request.body.status !==undefined) {

      pool.query(
        'UPDATE todos SET status = $1 WHERE id = $2',
        [request.body.status, id],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Todo modified with ID: ${id}`)
        }
      )    
    }
    else {
    
      pool.query(
        'UPDATE todos SET title = $1, description = $2 WHERE id = $3',
        [title, description, id],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Todo modified with ID: ${id}`)
        }
      )
    }
  }
const createTodo = (request, response) => {

    const { title, description } = request.body
  
    pool.query('INSERT INTO todos (title, description, status) VALUES ($1, $2, false)', [title, description], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Todo added with ID: ${result.id}`)
    })
  }

  const deleteTodo = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Todo deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
    


}