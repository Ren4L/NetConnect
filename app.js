const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const Registration = require('./Modules/Registration');
const Authorization = require('./Modules/Authorization');
const ConfirmationMail = require('./Modules/ConfirmationMail');
const News = require('./Modules/News');

const port=3000;

app.set('Views', path.join(__dirname,'Views'));
app.set("view engine", 'ejs');

app.use('/public', express.static('public'));
app.use(session({
  secret:'Witcher Wild Hunt',
  key:'sid',
  resave:false,
  store: new FileStore,
  saveUninitialized:true,
  // cookie:{
  //   maxAge:10000,
  // }
}));
app.use('/Modules/Registration', Registration);
app.use('/Modules/Authorization', Authorization);
app.use('/Modules/ConfirmationMail', ConfirmationMail);
app.use('/Modules/News', News);


app.get('/',(req, res)=>{
  res.clearCookie('sid', {path: '/'});
  res.render('Authorization');
}).listen(port, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});
