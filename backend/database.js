const mongoose = require('mongoose')

const mongoURI = `mongodb://localhost/testacme`

mongoose.Promise = global.Promise

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('DB is connected')
  } catch (error) {
    console.log(err)
  }
}

module.exports = {
  connect
}