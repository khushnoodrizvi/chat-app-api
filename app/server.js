const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser');
const sessions = require('express-session')
const mongoDBStrore = require('connect-mongodb-session')(sessions)
const users = require('./routes/router')
const conversations = require('./routes/conversation.router')
const auth = require('./routes/auth.router')
const User = require('./models/users.model');
const { DATABASE_URL } = require('./common/config');

const app = express()

mongoose.connect(DATABASE_URL);

const store = new mongoDBStrore({
  uri: DATABASE_URL,
  collection: "sessions"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({origin: "http://localhost:5001", credentials: true}))
app.use(sessions({
  name : 'chat.sid',
  secret: "my secret",
  saveUninitialized:true,
  resave: true,
  store: store
}));

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('database connectede'))


app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then((user) => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err))
})

app.use('/auth',auth)
app.use('/users',users)
app.use('/conversations',conversations)



module.exports = app;