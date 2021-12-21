const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const path = require('path')
const users = require('./routes/api/users')
const app = express()

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(bodyParser.json())
app.use(cors())

// DB Config and connect
const db = require('./config/keys').mongoURI
mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err))

// Passport middleware and config
app.use(passport.initialize())
require('./config/passport')(passport)

//  Define the route to read the files of the server from the client
app.use('/uploads/', express.static('uploads'))
app.use(cors())

// Routes
app.use('/api/user', users)

// For deploying on hosting server
// app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
