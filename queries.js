const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: '123',
  port: 5432,
})


const getUsers = (request, response) => {
    console.log('in get ')
    pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  const createUser = (request, response) => {

    console.log('in create')
    const { title, description } = request.body
  
    pool.query('INSERT INTO todos (title, description) VALUES ($1, $2)', [title, description], (error, result) => {
      if (error) {
        throw error
      }
      console.log(result)
      response.status(201).send(`Todo added with ID: ${result.id}`)
    })
  }

  
  module.exports = {
    getUsers,
    createUser,
    


}