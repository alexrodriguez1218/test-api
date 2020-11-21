const express = require('express')
const morgan = require('morgan')

// init
const app = express()


// settings
app.set('port', process.env.PORT || 3000)

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// G variables // pendiente para validad si se necesita 
app.use((req, res, next) => {
  next()
})


// Routes
app.use(require('./routes'))
app.use('/persons', require('./routes/persons'))


// Public

// stating server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})
