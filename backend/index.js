const express = require('express')
const expressGraphql = require('express-graphql').graphqlHTTP
const cors = require('cors')

const db = require('./database')
const { port } = require('./config')

const app = express()
db.connect()

const UserSchema = require('./src/lib/schemas/user')

app.use('*', cors())
app.use('/graphql', expressGraphql({
  schema: UserSchema,
  graphql: true,
}))

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})