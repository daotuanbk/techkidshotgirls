const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
const config = require('./config-local.json');
const imageRouter = require('./modules/api/images/router');
const userRouter = require('./modules/api/users/router');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/images', imageRouter);
app.use('/api/users', userRouter);

app.use(session({
  secret: config.sessionSecret, //
  resave: false, //login roi, cookie
  saveUninitialized: false, //
  cookie: { 
    secure: config.secureCookie,
    maxAge: 12 * 60 * 60 * 1000 }  
  // sever -> session: {
  //   sessionId: Id tu sinh ra -> tu match de biet ai dang dung
  //   username: ...
  // }
  // client -> cookie: {
  //   sessionId: ...
  //   luu lai o may nguoi dung sau bao nhieu ms
  // }
}))

app.get('/', (req, res) => {
  res.send('OK');
})

mongoose.connect(config.mongoPath, (err) => {
  if (err) console.error(err);
  else console.log('Database connect successful')
});

const port = process.env.port || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log('Sever started at port ' + port);
})