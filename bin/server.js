const app = require('../app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

const { DB_HOST } = process.env

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`)
    process.exit(1)
  })
