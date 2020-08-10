const express = require('express')
const expressGraphql = require('express-graphql')
const cors = require('cors')

const db = require('./database')
const { port } = require('./config')

const app = express()

db.connect()

// const UserSchema = require('')

// app.use(cors())
// // app.use('/graphql', expressGraphql({
// //   schema: UserSchema,
// //   graphiql: true,
// // }))

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})